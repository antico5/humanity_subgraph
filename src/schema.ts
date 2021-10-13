import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";


export class Proposal extends Entity {
  constructor(id: string) {
    super();

    this.id = id
    this.result = "Pending"
    this.yesCount = BigInt.zero()
    this.noCount = BigInt.zero()
    this.voteActionCount = BigInt.zero()
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Proposal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Proposal entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Proposal", id.toString(), this);
    }
  }

  static load(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get("Proposal", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get result(): string {
    let value = this.get("result");
    return value!.toString() ;
  }

  set result(value: string) {
    this.set("result", Value.fromString(value));
  }

  get proposer(): Address {
    let value = this.get("proposer");
    return value!.toAddress();
  }

  set proposer(value: Address) {
    this.set("proposer", Value.fromAddress(value));
  }

  get target(): Address {
    let value = this.get("target");
    return value!.toAddress();
  }

  set target(value: Address) {
    this.set("target", Value.fromAddress(value));
  }

  get data(): Bytes {
    let value = this.get("data");
    return value!.toBytes();
  }

  set data(value: Bytes) {
    this.set("data", Value.fromBytes(value));
  }

  get feeRecipient(): Address {
    let value = this.get("feeRecipient");
    return value!.toAddress();
  }

  set feeRecipient(value: Address) {
    this.set("feeRecipient", Value.fromAddress(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    return value!.toBigInt();
  }
  
  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    return value!.toBigInt();
  }
  
  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get yesCount(): BigInt {
    let value = this.get("yesCount");
    return value!.toBigInt();
  }
  
  set yesCount(value: BigInt) {
    this.set("yesCount", Value.fromBigInt(value));
  }

  get noCount(): BigInt {
    let value = this.get("noCount");
    return value!.toBigInt();
  }
  
  set noCount(value: BigInt) {
    this.set("noCount", Value.fromBigInt(value));
  }
  
  get acceptanceRatio(): BigDecimal | null {
    let value = this.get("acceptanceRatio");
    return value && value.toBigDecimal() || null;
  }
  
  set acceptanceRatio(value: BigDecimal) {
    this.set("acceptanceRatio", Value.fromBigDecimal(value));
  }
  
  get endTime(): BigInt {
    let value = this.get("endTime");
    return value && value.toBigInt() || null;
  }
  
  set endTime(value: BigInt) {
    this.set("endTime", Value.fromBigInt(value));
  }
  
  get voteActionCount(): BigInt {
    let value = this.get("voteActionCount");
    return value!.toBigInt();
  }
  
  set voteActionCount(value: BigInt) {
    this.set("voteActionCount", Value.fromBigInt(value));
  }
  
  get timeOpen(): BigInt | null {
    let value = this.get("timeOpen");
    return value && value.toBigInt() || null;
  }
  
  set timeOpen(value: BigInt) {
    this.set("timeOpen", Value.fromBigInt(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super()

    this.id = id
    this.deposited = BigInt.zero()
    this.maxDeposited = BigInt.zero()
    this.noVoteCount = BigInt.zero()
    this.yesVoteCount = BigInt.zero()
    this.proposalCount = BigInt.zero()
    this.feesReceived = BigInt.zero()
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get deposited(): BigInt {
    let value = this.get("deposited");
    return value!.toBigInt();
  }
  
  set deposited(value: BigInt) {
    this.set("deposited", Value.fromBigInt(value));
  }
  
  get maxDeposited(): BigInt {
    let value = this.get("maxDeposited");
    return value!.toBigInt();
  }
  
  set maxDeposited(value: BigInt) {
    this.set("maxDeposited", Value.fromBigInt(value));
  }
  
  get yesVoteCount(): BigInt {
    let value = this.get("yesVoteCount");
    return value!.toBigInt();
  }
  
  set yesVoteCount(value: BigInt) {
    this.set("yesVoteCount", Value.fromBigInt(value));
  }
  
  get noVoteCount(): BigInt {
    let value = this.get("noVoteCount");
    return value!.toBigInt();
  }
  
  set noVoteCount(value: BigInt) {
    this.set("noVoteCount", Value.fromBigInt(value));
  }
  
  get proposalCount(): BigInt {
    let value = this.get("proposalCount");
    return value!.toBigInt();
  }
  
  set proposalCount(value: BigInt) {
    this.set("proposalCount", Value.fromBigInt(value));
  }
  
  get feesReceived(): BigInt {
    let value = this.get("feesReceived");
    return value!.toBigInt();
  }
  
  set feesReceived(value: BigInt) {
    this.set("feesReceived", Value.fromBigInt(value));
  }
}
