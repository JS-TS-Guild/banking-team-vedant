import {
  BankAccountId,
  BankId,
  BankOptions,
  BanksMap,
  UserId,
} from "@/types/Common";
import BankAccount from "./bank-account";
import User from "./user";

export default class Bank {
  private id: BankId;
  private options?: BankOptions;
  private accounts: BankAccountId[];
  private static banksMap: BanksMap = new Map();

  private constructor(id: BankId, options?: BankOptions) {
    this.id = id;
    if (options) this.options = options;
    this.accounts = [];
  }

  static create(options?: BankOptions): Bank {
    const id = globalThis.crypto.randomUUID();
    const bank = new Bank(id, options);
    Bank.banksMap.set(id, bank);
    return bank;
  }

  static getById(id: BankId): Bank {
    return Bank.banksMap.get(id);
  }

  getId(): BankId {
    return this.id;
  }

  createAccount(balance: number): BankAccount {
    const account = BankAccount.create(this.id, balance);
    this.accounts.push(account.getId());
    return account;
  }

  getAccount(id: BankAccountId): BankAccount {
    return BankAccount.getById(id);
  }

  doesAllowNegativeBalance(): boolean {
    return this.options?.isNegativeAllowed ?? false;
  }

  send(from: UserId, to: UserId, amount: number, toBankId?: BankId) {
    const fromUser = User.getById(from);
    const toUser = User.getById(to);
    const fromUserAccounts = fromUser.getAccounts();
    const toUserAccounts = toUser.getAccounts();
    let fromUserAccountId = fromUserAccounts.find((accountId) => {
      const account = BankAccount.getById(accountId);
      return account.getBankId() === this.id;
    });
    if (!fromUserAccountId) {
      throw new Error("Sender does not have an account in this bank.");
    }
    fromUserAccountId = fromUserAccounts.find((accountId) => {
      const account = BankAccount.getById(accountId);
      return account.getBankId() === this.id && account.getBalance() >= amount;
    });
    if (!fromUserAccountId && this.doesAllowNegativeBalance()) {
      fromUserAccountId = fromUserAccounts.find((accountId) => {
        const account = BankAccount.getById(accountId);
        return account.getBankId() === this.id;
      });
    } else if (!fromUserAccountId) {
      throw new Error("Insufficient funds");
    }
    const toUserAccountId = toUserAccounts.find((accountId) => {
      const account = BankAccount.getById(accountId);
      return toBankId
        ? account.getBankId() === toBankId
        : account.getBankId() === this.id;
    });
    if (!toUserAccountId) {
      throw new Error("Recipient does not have an account in this bank.");
    }
    const fromUserAccount = BankAccount.getById(fromUserAccountId);
    const toUserAccount = BankAccount.getById(toUserAccountId);
    fromUserAccount.setBalance(fromUserAccount.getBalance() - amount);
    toUserAccount.setBalance(toUserAccount.getBalance() + amount);
  }
}
