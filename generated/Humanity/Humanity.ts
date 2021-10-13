// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Execute extends ethereum.Event {
  get params(): Execute__Params {
    return new Execute__Params(this);
  }
}

export class Execute__Params {
  _event: Execute;

  constructor(event: Execute) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Propose extends ethereum.Event {
  get params(): Propose__Params {
    return new Propose__Params(this);
  }
}

export class Propose__Params {
  _event: Propose;

  constructor(event: Propose) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get proposer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get target(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get data(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class RemoveVote extends ethereum.Event {
  get params(): RemoveVote__Params {
    return new RemoveVote__Params(this);
  }
}

export class RemoveVote__Params {
  _event: RemoveVote;

  constructor(event: RemoveVote) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Terminate extends ethereum.Event {
  get params(): Terminate__Params {
    return new Terminate__Params(this);
  }
}

export class Terminate__Params {
  _event: Terminate;

  constructor(event: Terminate) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Vote extends ethereum.Event {
  get params(): Vote__Params {
    return new Vote__Params(this);
  }
}

export class Vote__Params {
  _event: Vote;

  constructor(event: Vote) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approve(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get weight(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Humanity__proposalsResult {
  value0: i32;
  value1: Address;
  value2: Bytes;
  value3: Address;
  value4: Address;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;
  value8: BigInt;

  constructor(
    value0: i32,
    value1: Address,
    value2: Bytes,
    value3: Address,
    value4: Address,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt,
    value8: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromBytes(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromUnsignedBigInt(this.value8));
    return map;
  }
}

export class Humanity__getProposalResultValue0Struct extends ethereum.Tuple {
  get result(): i32 {
    return this[0].toI32();
  }

  get target(): Address {
    return this[1].toAddress();
  }

  get data(): Bytes {
    return this[2].toBytes();
  }

  get proposer(): Address {
    return this[3].toAddress();
  }

  get feeRecipient(): Address {
    return this[4].toAddress();
  }

  get fee(): BigInt {
    return this[5].toBigInt();
  }

  get startTime(): BigInt {
    return this[6].toBigInt();
  }

  get yesCount(): BigInt {
    return this[7].toBigInt();
  }

  get noCount(): BigInt {
    return this[8].toBigInt();
  }
}

export class Humanity extends ethereum.SmartContract {
  static bind(address: Address): Humanity {
    return new Humanity("Humanity", address);
  }

  proposals(param0: BigInt): Humanity__proposalsResult {
    let result = super.call(
      "proposals",
      "proposals(uint256):(uint8,address,bytes,address,address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Humanity__proposalsResult(
      result[0].toI32(),
      result[1].toAddress(),
      result[2].toBytes(),
      result[3].toAddress(),
      result[4].toAddress(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toBigInt()
    );
  }

  try_proposals(
    param0: BigInt
  ): ethereum.CallResult<Humanity__proposalsResult> {
    let result = super.tryCall(
      "proposals",
      "proposals(uint256):(uint8,address,bytes,address,address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Humanity__proposalsResult(
        value[0].toI32(),
        value[1].toAddress(),
        value[2].toBytes(),
        value[3].toAddress(),
        value[4].toAddress(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBigInt(),
        value[8].toBigInt()
      )
    );
  }

  yesVotes(param0: BigInt, param1: Address): BigInt {
    let result = super.call("yesVotes", "yesVotes(uint256,address):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0),
      ethereum.Value.fromAddress(param1)
    ]);

    return result[0].toBigInt();
  }

  try_yesVotes(param0: BigInt, param1: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "yesVotes",
      "yesVotes(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  time(): BigInt {
    let result = super.call("time", "time():(uint256)", []);

    return result[0].toBigInt();
  }

  try_time(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("time", "time():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  OPEN_VOTE_PERIOD(): BigInt {
    let result = super.call(
      "OPEN_VOTE_PERIOD",
      "OPEN_VOTE_PERIOD():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_OPEN_VOTE_PERIOD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "OPEN_VOTE_PERIOD",
      "OPEN_VOTE_PERIOD():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  TOTAL_VOTE_PERIOD(): BigInt {
    let result = super.call(
      "TOTAL_VOTE_PERIOD",
      "TOTAL_VOTE_PERIOD():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_TOTAL_VOTE_PERIOD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "TOTAL_VOTE_PERIOD",
      "TOTAL_VOTE_PERIOD():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getProposalsCount(): BigInt {
    let result = super.call(
      "getProposalsCount",
      "getProposalsCount():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getProposalsCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getProposalsCount",
      "getProposalsCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  propose(target: Address, data: Bytes): BigInt {
    let result = super.call("propose", "propose(address,bytes):(uint256)", [
      ethereum.Value.fromAddress(target),
      ethereum.Value.fromBytes(data)
    ]);

    return result[0].toBigInt();
  }

  try_propose(target: Address, data: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall("propose", "propose(address,bytes):(uint256)", [
      ethereum.Value.fromAddress(target),
      ethereum.Value.fromBytes(data)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  void(): Address {
    let result = super.call("void", "void():(address)", []);

    return result[0].toAddress();
  }

  try_void(): ethereum.CallResult<Address> {
    let result = super.tryCall("void", "void():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  withdrawTimes(param0: Address): BigInt {
    let result = super.call(
      "withdrawTimes",
      "withdrawTimes(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_withdrawTimes(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "withdrawTimes",
      "withdrawTimes(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposalFee(): BigInt {
    let result = super.call("proposalFee", "proposalFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_proposalFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("proposalFee", "proposalFee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getProposal(proposalId: BigInt): Humanity__getProposalResultValue0Struct {
    let result = super.call(
      "getProposal",
      "getProposal(uint256):((uint8,address,bytes,address,address,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return changetype<Humanity__getProposalResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getProposal(
    proposalId: BigInt
  ): ethereum.CallResult<Humanity__getProposalResultValue0Struct> {
    let result = super.tryCall(
      "getProposal",
      "getProposal(uint256):((uint8,address,bytes,address,address,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Humanity__getProposalResultValue0Struct>(value[0].toTuple())
    );
  }

  noVotes(param0: BigInt, param1: Address): BigInt {
    let result = super.call("noVotes", "noVotes(uint256,address):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0),
      ethereum.Value.fromAddress(param1)
    ]);

    return result[0].toBigInt();
  }

  try_noVotes(param0: BigInt, param1: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "noVotes",
      "noVotes(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposeWithFeeRecipient(
    feeRecipient: Address,
    target: Address,
    data: Bytes
  ): BigInt {
    let result = super.call(
      "proposeWithFeeRecipient",
      "proposeWithFeeRecipient(address,address,bytes):(uint256)",
      [
        ethereum.Value.fromAddress(feeRecipient),
        ethereum.Value.fromAddress(target),
        ethereum.Value.fromBytes(data)
      ]
    );

    return result[0].toBigInt();
  }

  try_proposeWithFeeRecipient(
    feeRecipient: Address,
    target: Address,
    data: Bytes
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposeWithFeeRecipient",
      "proposeWithFeeRecipient(address,address,bytes):(uint256)",
      [
        ethereum.Value.fromAddress(feeRecipient),
        ethereum.Value.fromAddress(target),
        ethereum.Value.fromBytes(data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VETO_PERIOD(): BigInt {
    let result = super.call("VETO_PERIOD", "VETO_PERIOD():(uint256)", []);

    return result[0].toBigInt();
  }

  try_VETO_PERIOD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("VETO_PERIOD", "VETO_PERIOD():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  deposits(param0: Address): BigInt {
    let result = super.call("deposits", "deposits(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_deposits(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("deposits", "deposits(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class FinalizeCall extends ethereum.Call {
  get inputs(): FinalizeCall__Inputs {
    return new FinalizeCall__Inputs(this);
  }

  get outputs(): FinalizeCall__Outputs {
    return new FinalizeCall__Outputs(this);
  }
}

export class FinalizeCall__Inputs {
  _call: FinalizeCall;

  constructor(call: FinalizeCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class FinalizeCall__Outputs {
  _call: FinalizeCall;

  constructor(call: FinalizeCall) {
    this._call = call;
  }
}

export class SetProposalFeeCall extends ethereum.Call {
  get inputs(): SetProposalFeeCall__Inputs {
    return new SetProposalFeeCall__Inputs(this);
  }

  get outputs(): SetProposalFeeCall__Outputs {
    return new SetProposalFeeCall__Outputs(this);
  }
}

export class SetProposalFeeCall__Inputs {
  _call: SetProposalFeeCall;

  constructor(call: SetProposalFeeCall) {
    this._call = call;
  }

  get fee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetProposalFeeCall__Outputs {
  _call: SetProposalFeeCall;

  constructor(call: SetProposalFeeCall) {
    this._call = call;
  }
}

export class VoteNoCall extends ethereum.Call {
  get inputs(): VoteNoCall__Inputs {
    return new VoteNoCall__Inputs(this);
  }

  get outputs(): VoteNoCall__Outputs {
    return new VoteNoCall__Outputs(this);
  }
}

export class VoteNoCall__Inputs {
  _call: VoteNoCall;

  constructor(call: VoteNoCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class VoteNoCall__Outputs {
  _call: VoteNoCall;

  constructor(call: VoteNoCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class RemoveVoteCall extends ethereum.Call {
  get inputs(): RemoveVoteCall__Inputs {
    return new RemoveVoteCall__Inputs(this);
  }

  get outputs(): RemoveVoteCall__Outputs {
    return new RemoveVoteCall__Outputs(this);
  }
}

export class RemoveVoteCall__Inputs {
  _call: RemoveVoteCall;

  constructor(call: RemoveVoteCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RemoveVoteCall__Outputs {
  _call: RemoveVoteCall;

  constructor(call: RemoveVoteCall) {
    this._call = call;
  }
}

export class VoteYesCall extends ethereum.Call {
  get inputs(): VoteYesCall__Inputs {
    return new VoteYesCall__Inputs(this);
  }

  get outputs(): VoteYesCall__Outputs {
    return new VoteYesCall__Outputs(this);
  }
}

export class VoteYesCall__Inputs {
  _call: VoteYesCall;

  constructor(call: VoteYesCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class VoteYesCall__Outputs {
  _call: VoteYesCall;

  constructor(call: VoteYesCall) {
    this._call = call;
  }
}

export class ProposeCall extends ethereum.Call {
  get inputs(): ProposeCall__Inputs {
    return new ProposeCall__Inputs(this);
  }

  get outputs(): ProposeCall__Outputs {
    return new ProposeCall__Outputs(this);
  }
}

export class ProposeCall__Inputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get target(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ProposeCall__Outputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class ProposeWithFeeRecipientCall extends ethereum.Call {
  get inputs(): ProposeWithFeeRecipientCall__Inputs {
    return new ProposeWithFeeRecipientCall__Inputs(this);
  }

  get outputs(): ProposeWithFeeRecipientCall__Outputs {
    return new ProposeWithFeeRecipientCall__Outputs(this);
  }
}

export class ProposeWithFeeRecipientCall__Inputs {
  _call: ProposeWithFeeRecipientCall;

  constructor(call: ProposeWithFeeRecipientCall) {
    this._call = call;
  }

  get feeRecipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get target(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class ProposeWithFeeRecipientCall__Outputs {
  _call: ProposeWithFeeRecipientCall;

  constructor(call: ProposeWithFeeRecipientCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get humanity(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposalFee(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
