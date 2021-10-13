import { BigDecimal, BigInt, Entity, ethereum } from "@graphprotocol/graph-ts"
import {
  Humanity,
  Execute,
  Propose,
  RemoveVote,
  Terminate,
  Vote
} from "../generated/Humanity/Humanity"
import { Proposal } from "./schema"

export function handlePropose(event: Propose): void {
  const proposal = new Proposal(event.params.proposalId.toString())

  let contract = Humanity.bind(event.address)
  const contractProposal = contract.getProposal(event.params.proposalId)

  proposal.proposer = event.params.proposer;
  proposal.target = event.params.target;
  proposal.data = event.params.data;
  proposal.feeRecipient = contractProposal.feeRecipient;
  proposal.fee = contractProposal.fee;
  proposal.startTime = contractProposal.startTime;

  proposal.save()
}

export function handleVote(event: Vote): void {
  const proposal = loadProposal(event.params.proposalId)

  calculateOnVoteFields(proposal, event)

  proposal.voteActionCount = proposal.voteActionCount.plus(BigInt.fromI32(1));

  proposal.save()
}

export function handleRemoveVote(event: RemoveVote): void {
  const proposal = loadProposal(event.params.proposalId)

  calculateOnVoteFields(proposal, event)

  proposal.voteActionCount = proposal.voteActionCount.minus(BigInt.fromI32(1));

  proposal.save()
}

export function handleExecute(event: Execute): void {
  const proposal = loadProposal(event.params.proposalId)
  
  proposal.result = "Yes"

  calculateOnEndFields(proposal, event)

  proposal.save()
}

export function handleTerminate(event: Terminate): void {
  const proposal = loadProposal(event.params.proposalId)

  proposal.result = "No"
  calculateOnEndFields(proposal, event)

  proposal.save()
}

// Private functions

function loadProposal(id: BigInt): Proposal {
  const proposal = Proposal.load(id.toString())
  
  if(!proposal){
    throw new Error(`Trying to load non-indexed proposal with id ${id}`)
  }

  return proposal
}

function calculateOnEndFields(proposal: Proposal, event: ethereum.Event): void {
  proposal.endTime = event.block.timestamp
  proposal.timeOpen = event.block.timestamp.minus(proposal.startTime)
}

function calculateOnVoteFields(proposal: Proposal, event: ethereum.Event): void {
  let contract = Humanity.bind(event.address)
  const contractProposal = contract.getProposal(BigInt.fromString(proposal.id))

  proposal.yesCount = contractProposal.yesCount
  proposal.noCount = contractProposal.noCount

  const totalCount = proposal.yesCount.plus(proposal.noCount)
  proposal.acceptanceRatio = proposal.yesCount.divDecimal(totalCount.toBigDecimal())
}