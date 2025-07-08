import { v4 as uuidv4 } from "uuid";
import {
  BankAccountId,
  BankId,
  BankOptions,
  BanksMap,
  UserAccountsMap,
  UserId,
} from "@/types/Common";
import BankAccount from "./bank-account";

export default class Bank {
  private id: BankId;
  private options?: BankOptions;
  private accounts: BankAccountId[];
  private static banksMap: BanksMap = new Map();
  private userAccountsMap: UserAccountsMap;

  private constructor(id: BankId, options?: BankOptions) {
    this.id = id;
    if (options) this.options = options;
    this.accounts = [];
    this.userAccountsMap = new Map();
  }

  static create(options?: BankOptions): Bank {
    const id = uuidv4();
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

  setUserAccount(userId: UserId, accountId: BankAccountId) {
    const userAccounts = this.userAccountsMap.get(userId) ?? [];
    userAccounts.push(accountId);
    this.userAccountsMap.set(userId, userAccounts);
  }

  getUserAccounts(userId: UserId): BankAccountId[] | undefined {
    return this.userAccountsMap.get(userId);
  }

  send(
    fromUserId: UserId,
    toUserId: UserId,
    amount: number,
    toBankId?: BankId
  ) {
    const fromUserAccounts = this.userAccountsMap.get(fromUserId);
    const toUserAccounts = toBankId
      ? Bank.getById(toBankId).getUserAccounts(toUserId)
      : this.userAccountsMap.get(toUserId);
    if (fromUserAccounts?.length === 0) {
      throw new Error("Sender does not have an account in this bank.");
    }
    if (toUserAccounts?.length === 0) {
      throw new Error("Recipient does not have an account in this bank.");
    }
    if (fromUserId === toUserId && (!toBankId || toBankId === this.id)) {
      throw new Error("Cannot transfer to the same user in the same bank.");
    }
    let tempAmount = amount;
    for (const accountId of fromUserAccounts) {
      const account = BankAccount.getById(accountId);
      tempAmount -= Math.min(tempAmount, account.getBalance());
    }
    if (tempAmount > 0) {
      if (!this.doesAllowNegativeBalance()) {
        throw new Error("Insufficient funds");
      } else {
        const account = BankAccount.getById(fromUserAccounts[0]);
        account.setBalance(account.getBalance() - amount);
      }
    } else {
      tempAmount = amount;
      for (const accountId of fromUserAccounts) {
        const account = BankAccount.getById(accountId);
        const minAmount = Math.min(tempAmount, account.getBalance());
        tempAmount -= minAmount;
        account.setBalance(account.getBalance() - minAmount);
      }
    }
    const toUserAccount = BankAccount.getById(toUserAccounts[0]);
    toUserAccount.setBalance(toUserAccount.getBalance() + amount);
  }
}
