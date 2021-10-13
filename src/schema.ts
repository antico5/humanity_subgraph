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

enum Result {
  Pending = "Pending",
  Yes = 'Yes',
  No = 'No'
}

export class Proposal extends Entity {
  constructor(id: string) {
    super();

    this.id = id
    this.result = Result.Pending
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

  get result(): Result {
    let value = this.get("result");
    return value!.toString() as Result;
  }

  set result(value: Result) {
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
}
