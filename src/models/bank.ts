import Account from "./bank-account";

export default class Bank {
  private id: string;

  private constructor(id: string) {
    this.id = id;
  }

  static create(): Bank {
    return new Bank(crypto.randomUUID());
  }

  getId(): string {
    return this.id;
  }

  createAccount(balance: number): Account {
    return Account.create(this.id, balance);
  }
}
