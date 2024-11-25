export enum PetType {
  Cat,
  Dog,
  Hamster,
  Turtle,
  Bird,
  Snake,
}

export class Pet {
  constructor(
    public readonly type: PetType,
    public readonly name: string,
    public readonly age: number
  ) {}
}

export class Person {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    private readonly _pets: Pet[]
  ) {}
  public get pets(): Pet[] {
    return [...this._pets];
  }
}

export class PetBuilder {
  private readonly _type?: PetType;
  private readonly _name?: string;
  private readonly _age?: number;

  private constructor(type?: PetType, name?: string, age?: number) {
    this._type = type;
    this._name = name;
    this._age = age;
  }

  public static readonly aPet = (): PetBuilder => new PetBuilder();

  public withType = (type: PetType): PetBuilder =>
    new PetBuilder(type, this._name, this._age);

  public withName = (name: string): PetBuilder =>
    new PetBuilder(this._type, name, this._age);

  public withAge = (age: number): PetBuilder =>
    new PetBuilder(this._type, this._name, age);

  public build(): Pet {
    if (this._type === undefined || !this._name || this._age === undefined) {
      console.log(this._type, this._name, this._age);
      throw new Error("Invalid pet");
    }
    return new Pet(this._type, this._name, this._age);
  }
}

export class PersonBuilder {
  private readonly _firstName?: string;
  private readonly _lastName?: string;
  private readonly _pets: Pet[] = [];

  private constructor(firstame?: string, lastName?: string, pets?: Pet[]) {
    this._firstName = firstame;
    this._lastName = lastName;
    if (pets) {
      this._pets = [...pets];
    }
  }

  public static readonly aPerson = (): PersonBuilder => new PersonBuilder();

  public withFirstName = (firstName: string): PersonBuilder =>
    new PersonBuilder(firstName, this._lastName, this._pets);

  public withLastName = (lastName: string): PersonBuilder =>
    new PersonBuilder(this._firstName, lastName, this._pets);

  public withPet = (pet: Pet): PersonBuilder => {
    const pets = [...this._pets, pet];
    return new PersonBuilder(this._firstName, this._lastName, pets);
  };

  public build(): Person {
    if (!this._firstName || !this._lastName) {
      throw new Error("Invalid person");
    }
    return new Person(this._firstName, this._lastName, this._pets);
  }
}
