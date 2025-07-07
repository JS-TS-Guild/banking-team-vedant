import {
  BankAccountId,
  BankAccountsMap,
  BankId,
  BankOptions,
  UserAccountsMap,
  UserId,
} from "@/types/Common";
import BankAccount from "./bank-account";
import GlobalRegistry from "@/services/GlobalRegistry";

export default class Bank {
  private id: BankId;
  private options?: BankOptions;

  private constructor(id: BankId, options?: BankOptions) {
    this.id = id;
    if (options) this.options = options;
  }

  static create(options?: BankOptions): Bank {
    if (options) return new Bank(globalThis.crypto.randomUUID(), options);
    return new Bank(globalThis.crypto.randomUUID());
  }

  getId(): BankId {
    return this.id;
  }

  createAccount(balance: number): BankAccount {
    const account = BankAccount.create(this.id, balance);
    GlobalRegistry.setBankAccount(account.getId(), account);
    return account;
  }

  getAccount(id: BankAccountId): BankAccount {
    return GlobalRegistry.getBankAccount(id);
  }

  send(from: UserId, to: UserId, amount: number, toBankId?: BankId) {}
}
