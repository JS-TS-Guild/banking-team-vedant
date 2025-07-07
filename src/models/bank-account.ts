export default class BankAccount {
  private id: string;
  private bankId: string;
  private balance: number;

  private constructor(id: string, bankId: string, balance: number) {
    this.id = id;
    this.bankId = bankId;
    this.balance = balance;
  }

  static create(bankId: string, balance: number): BankAccount {
    return new BankAccount(crypto.randomUUID(), bankId, balance);
  }

  getId(): string {
    return this.id;
  }

  getBankId(): string {
    return this.bankId;
  }

  getBalance(): number {
    return this.balance;
  }
}
