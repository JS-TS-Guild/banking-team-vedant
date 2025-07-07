import {
  BankAccountId,
  BankAccountsMap,
  BankId,
  BanksMap,
  UserId,
  UserMap,
} from "@/types/Common";
import BankAccount from "@/models/bank-account";
import Bank from "@/models/bank";
import User from "@/models/user";

export default class GlobalRegistry {
  private static bankAccounts: BankAccountsMap;
  private static banks: BanksMap;
  private static users: UserMap;

  static clear() {
    this.bankAccounts = new Map();
    this.banks = new Map();
    this.users = new Map();
  }

  static getBankAccount(id: BankAccountId): BankAccount {
    return this.bankAccounts.get(id);
  }

  static setBankAccount(id: BankAccountId, account: BankAccount) {
    this.bankAccounts.set(id, account);
  }

  static getBank(id: BankId): Bank {
    return this.banks.get(id);
  }

  static setBank(id: BankId, bank: Bank) {
    this.banks.set(id, bank);
  }

  static getUser(id: UserId): User {
    return this.users.get(id);
  }

  static setUser(id: UserId, user: User) {
    this.users.set(id, user);
  }
}
