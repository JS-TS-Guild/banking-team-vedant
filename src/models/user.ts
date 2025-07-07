import { UserId } from "@/types/Common";
import { BankAccountId } from "@/types/Common";

export default class User {
  private id: UserId;
  private name: string;
  private accountIds: BankAccountId[];

  private constructor(id: UserId, name: string, accountIds: BankAccountId[]) {
    this.id = id;
    this.name = name;
    this.accountIds = accountIds;
  }

  static create(name: string, accountIds: BankAccountId[]): User {
    return new User(globalThis.crypto.randomUUID(), name, accountIds);
  }

  getId(): UserId {
    return this.id;
  }
}
