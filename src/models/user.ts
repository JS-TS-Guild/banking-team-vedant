import GlobalRegistry from "@/services/GlobalRegistry";
import { UserId, UserMap } from "@/types/Common";
import { BankAccountId } from "@/types/Common";
import BankAccount from "./bank-account";

export default class User {
  private id: UserId;
  private name: string;
  private accountIds: BankAccountId[];
  private static usersMap: UserMap = new Map();

  private constructor(id: UserId, name: string, accountIds: BankAccountId[]) {
    this.id = id;
    this.name = name;
    this.accountIds = accountIds;
  }

  static create(name: string, accountIds: BankAccountId[]): User {
    const id = globalThis.crypto.randomUUID();
    const user = new User(id, name, accountIds);
    User.usersMap.set(id, user);
    return user;
  }

  static getById(id: UserId): User {
    return User.usersMap.get(id);
  }

  getId(): UserId {
    return this.id;
  }

  getAccounts(): BankAccountId[] {
    return this.accountIds;
  }
}
