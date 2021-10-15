import { newMockEvent } from "matchstick-as/assembly/index"
import { Propose, Propose__Params } from "../../generated/Humanity/Humanity";
import { Address, ByteArray, Bytes, ethereum } from "@graphprotocol/graph-ts"

export function createProposeEvent(proposalId: i32, proposer: string, target: string, data: string): Propose {
  let mockEvent = newMockEvent()
  const proposeEvent = new Propose(mockEvent.address, mockEvent.logIndex, mockEvent.transactionLogIndex,mockEvent.logType, mockEvent.block, mockEvent.transaction, mockEvent.parameters)

  proposeEvent.parameters = new Array()
  
  proposeEvent.parameters.push(new ethereum.EventParam(
    "proposalId", 
    ethereum.Value.fromI32(proposalId)
  ))

  proposeEvent.parameters.push(new ethereum.EventParam(
    "proposer", 
    ethereum.Value.fromAddress(Address.fromString(proposer))
  ))

  proposeEvent.parameters.push(new ethereum.EventParam(
    "target", 
    ethereum.Value.fromAddress(Address.fromString(target))
  ))

  proposeEvent.parameters.push(new ethereum.EventParam(
    "data", 
    ethereum.Value.fromBytes(Bytes.fromByteArray(ByteArray.fromUTF8(data)))
  ))

  return proposeEvent
}
