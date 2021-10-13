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
  
  get acceptanceRatio(): BigDecimal {
    let value = this.get("acceptanceRatio");
    return value!.toBigDecimal();
  }
  
  set acceptanceRatio(value: BigDecimal) {
    this.set("acceptanceRatio", Value.fromBigDecimal(value));
  }
  
  get endTime(): BigInt {
    let value = this.get("endTime");
    return value!.toBigInt();
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
  
  get timeOpen(): BigInt {
    let value = this.get("timeOpen");
    return value!.toBigInt();
  }
  
  set timeOpen(value: BigInt) {
    this.set("timeOpen", Value.fromBigInt(value));
  }
}
