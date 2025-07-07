import { BankAccountId, BankId } from "@/types/Common";

export default class BankAccount {
  private id: BankAccountId;
  private bankId: BankId;
  private balance: number;

  private constructor(id: BankAccountId, bankId: BankId, balance: number) {
    this.id = id;
    this.bankId = bankId;
    this.balance = balance;
  }

  static create(bankId: BankId, balance: number): BankAccount {
    return new BankAccount(globalThis.crypto.randomUUID(), bankId, balance);
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
