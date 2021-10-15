import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent, test } from "matchstick-as/assembly/index"
import { log } from "matchstick-as/assembly/log"
import { handlePropose } from "../src/mapping"
import { createProposeEvent } from "./factories/propose_event"
import { assert } from "matchstick-as/assembly/assert"

export function runTests(): void {
  test("handleProposal creates a new Proposal record", () => { 
    const proposeEvent = createProposeEvent(1, '0xf78a4411e98eb741bcb552950034a731b32e2f96', '0xf78a4411e98eb741bcb552950034a731b32e2f97', 'some data')

    handlePropose(proposeEvent)

    assert.fieldEquals('Proposal', '1', 'id', '1')
    assert.fieldEquals('Proposal', '1', 'proposer', '0xf78a4411e98eb741bcb552950034a731b32e2f96')
    assert.fieldEquals('Proposal', '1', 'target', '0xf78a4411e98eb741bcb552950034a731b32e2f97')
    assert.fieldEquals('Proposal', '1', 'data', Bytes.fromUTF8('some data').toHexString())
   })
}