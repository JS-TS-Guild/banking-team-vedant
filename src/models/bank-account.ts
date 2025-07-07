import { BankAccountId, BankAccountsMap, BankId } from "@/types/Common";

export default class BankAccount {
  private id: BankAccountId;
  private bankId: BankId;
  private balance: number;
  private static bankAccountsMap: BankAccountsMap = new Map();

  private constructor(id: BankAccountId, bankId: BankId, balance: number) {
    this.id = id;
    this.bankId = bankId;
    this.balance = balance;
  }

  static create(bankId: BankId, balance: number): BankAccount {
    const id = globalThis.crypto.randomUUID();
    const bankAccount = new BankAccount(id, bankId, balance);
    BankAccount.bankAccountsMap.set(id, bankAccount);
    return bankAccount;
  }

  static getById(id: BankAccountId): BankAccount {
    return BankAccount.bankAccountsMap.get(id);
  }

  getId(): BankAccountId {
    return this.id;
  }

  getBankId(): BankId {
    return this.bankId;
  }

  getBalance(): number {
    return this.balance;
  }

  setBalance(balance: number) {
    this.balance = balance;
  }
}
