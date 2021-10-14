import { Address, BigDecimal, BigInt, Bytes, Entity, ethereum, log, store } from "@graphprotocol/graph-ts"
import {
  Humanity,
  Execute,
  Propose,
  RemoveVote,
  Terminate,
  Vote as VoteEvent,
  DepositCall,
  WithdrawCall,
  Vote__Params
} from "../generated/Humanity/Humanity"
import { Account, Analytic, Proposal, Vote } from "../generated/schema"

// Event Handlers

export function handlePropose(event: Propose): void {
  const proposal = new Proposal(event.params.proposalId.toString())
  const account = loadAccount(event.params.proposer)
  const analytics = getAnalytic()

  let contract = Humanity.bind(event.address)
  const contractProposal = contract.getProposal(event.params.proposalId)

  proposal.proposer = event.params.proposer;
  proposal.target = event.params.target;
  proposal.data = event.params.data;
  proposal.feeRecipient = contractProposal.feeRecipient;
  proposal.fee = contractProposal.fee;
  proposal.startTime = contractProposal.startTime;
  proposal.save()

  account.proposalCount = account.proposalCount.plus(BigInt.fromI32(1))
  account.save()

  analytics.proposalCount = analytics.proposalCount.plus(BigInt.fromI32(1))
  addAnalyticTotalAmount(analytics, proposal.fee)
  analytics.save()
}

export function handleVote(event: VoteEvent): void {
  const proposal = loadProposal(event.params.proposalId)
  const account = loadAccount(event.params.voter)
  const analytics = getAnalytic()

  // Proposal
  calculateOnVoteFields(proposal, event)
  proposal.voteActionCount = proposal.voteActionCount.plus(BigInt.fromI32(1));
  proposal.save()

  // Account
  if(event.params.approve){
    account.yesVoteCount = account.yesVoteCount.plus(BigInt.fromI32(1))
  } else {
    account.noVoteCount = account.noVoteCount.plus(BigInt.fromI32(1))
  }
  account.save()
  
  // Vote
  createVote(event.params)

  // Analytic
  addAnalyticTotalAmount(analytics, event.params.weight)
  analytics.save()

}

export function handleRemoveVote(event: RemoveVote): void {
  const proposal = loadProposal(event.params.proposalId)
  const account = loadAccount(event.params.voter)
  const voteId = makeVoteId(event.params.voter, event.params.proposalId)
  const vote = findVote(voteId)
  const analytics = getAnalytic()
  
  // Proposal
  calculateOnVoteFields(proposal, event)
  proposal.voteActionCount = proposal.voteActionCount.minus(BigInt.fromI32(1));
  proposal.save()
  
  // Account
  if(vote && vote.approve){
    account.yesVoteCount = account.yesVoteCount.minus(BigInt.fromI32(1))
  } else if (vote && !vote.approve) {
    account.noVoteCount = account.noVoteCount.minus(BigInt.fromI32(1))
  }
  account.save()
  
  // Vote
  if (vote) {
    store.remove('Vote', voteId)
  }

  // Analytic
  addAnalyticTotalAmount(analytics, vote.weight.neg())
  analytics.save()
}

export function handleExecute(event: Execute): void {
  const proposal = loadProposal(event.params.proposalId)
  const account = loadAccount(proposal.proposer)
  const analytics = getAnalytic()
  
  proposal.result = "Yes"
  calculateOnEndFields(proposal, event, analytics)

  account.feesReceived = account.feesReceived.plus(proposal.fee)

  analytics.totalPassed = analytics.totalPassed.plus(BigInt.fromI32(1))
  
  proposal.save()
  account.save()
  analytics.save()
}

export function handleTerminate(event: Terminate): void {
  const proposal = loadProposal(event.params.proposalId)
  const analytics = getAnalytic()

  proposal.result = "No"
  calculateOnEndFields(proposal, event, analytics)

  analytics.totalRejected = analytics.totalRejected.plus(BigInt.fromI32(1))

  proposal.save()
  analytics.save()
}

// Call handlers

export function handleDepositCall(call: DepositCall): void {
  const account = loadAccount(call.from)
  let contract = Humanity.bind(call.to)
  
  account.deposited = contract.deposits(call.from)
  account.maxDeposited = account.deposited > account.maxDeposited ? account.deposited : account.maxDeposited

  account.save()
}

export function handleWithdrawCall(call: WithdrawCall): void {
  const account = loadAccount(call.from)
  
  let contract = Humanity.bind(call.to)
  
  account.deposited = contract.deposits(call.from)

  account.save()
}

// Private functions

function loadProposal(id: BigInt): Proposal {
  const proposal = Proposal.load(id.toString())
  
  if(!proposal){
    throw new Error(`Trying to load non-indexed proposal with id ${id}`)
  }

  return proposal 
}

function loadAccount(address: Bytes): Account {
  let account = Account.load(address.toHex())
  
  if(!account){
    account = new Account(address.toHex())
    account.save()
  }

  return account
}

function makeVoteId(accountId: Address, proposalId: BigInt): string {
  return accountId.toHex() + '-' + proposalId.toString()
}

function findVote(id: string): Vote { 
  const vote = Vote.load(id)

  if (!vote){
    throw new Error(`Couldnt find vote with id ${id}`)
  }

  return vote
}

function createVote(params: Vote__Params): Vote{
  const id = makeVoteId(params.voter, params.proposalId)
  const vote = new Vote(id)

  vote.proposal = params.proposalId.toString()
  vote.account = params.voter.toHex()
  vote.approve = params.approve
  vote.weight = params.weight

  vote.save()

  return vote
}

function getAnalytic(): Analytic {
  let analytics = Analytic.load('1')

  if (!analytics) {
    analytics = new Analytic('1')
    analytics.save()
  }

  return analytics
}

function addAnalyticTotalAmount(analytics: Analytic, amount: BigInt): void {
  analytics.totalAmount = analytics.totalAmount.plus(amount)
  analytics.avgAmount = analytics.totalAmount.div(analytics.proposalCount)
}

function calculateOnEndFields(proposal: Proposal, event: ethereum.Event, analytics: Analytic): void {
  proposal.endTime = event.block.timestamp
  proposal.timeOpen = event.block.timestamp.minus(proposal.startTime)

  analytics.completedProposalCount = analytics.completedProposalCount.plus(BigInt.fromI32(1))
  analytics.totalWait = analytics.totalWait.plus(proposal.timeOpen!)
  analytics.avgWait = analytics.totalWait.div(analytics.completedProposalCount)
}

function calculateOnVoteFields(proposal: Proposal, event: ethereum.Event): void {
  let contract = Humanity.bind(event.address)
  const contractProposal = contract.getProposal(BigInt.fromString(proposal.id))

  proposal.yesAmount = contractProposal.yesAmount
  proposal.noAmount = contractProposal.noAmount

  const totalCount = proposal.yesAmount.plus(proposal.noAmount)
  proposal.acceptanceRatio = proposal.yesAmount.divDecimal(totalCount.toBigDecimal())
}