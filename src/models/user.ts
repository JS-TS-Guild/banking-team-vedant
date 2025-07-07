export default class User {
  private id: string;
  private name: string;
  private accountIds: string[];

  private constructor(id: string, name: string, accountIds: string[]) {
    this.id = id;
    this.name = name;
    this.accountIds = accountIds;
  }

  static create(name: string, accountIds: string[]): User {
    return new User(crypto.randomUUID(), name, accountIds);
  }

  getId(): string {
    return this.id;
  }
}
