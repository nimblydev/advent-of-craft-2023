import { Person, Pet, PetType } from "../src/people";

describe("population", () => {
  let population: Person[];

  beforeEach(() => {
    population = [
      new Person("Peter", "Griffin", [new Pet(PetType.Cat, "Tabby", 2)]),
      new Person("Stewie", "Griffin", [
        new Pet(PetType.Cat, "Dolly", 3),
        new Pet(PetType.Dog, "Brian", 9),
      ]),
      new Person("Joe", "Swanson", [new Pet(PetType.Dog, "Spike", 4)]),
      new Person("Lois", "Griffin", [new Pet(PetType.Snake, "Serpy", 1)]),
      new Person("Meg", "Griffin", [new Pet(PetType.Bird, "Tweety", 1)]),
      new Person("Chris", "Griffin", [new Pet(PetType.Turtle, "Speedy", 4)]),
      new Person("Cleveland", "Brown", [
        new Pet(PetType.Hamster, "Fuzzy", 1),
        new Pet(PetType.Hamster, "Wuzzy", 2),
      ]),
      new Person("Glenn", "Quagmire", []),
    ];
  });

  test("Lois owns the youngest pet", () => {
    const filtered = population.sort(comparePetAgeForPersons)[0];

    expect(filtered).not.toBeNull();
    expect(filtered.firstName).toBe("Lois");
  });

  test("we should be able to represent people with their pets", () => {
    const response = formatPopulation(population);
    expect(response).toBe(
      "Peter Griffin who owns : Tabby" +
        "\n" +
        "Stewie Griffin who owns : Dolly Brian" +
        "\n" +
        "Joe Swanson who owns : Spike" +
        "\n" +
        "Lois Griffin who owns : Serpy" +
        "\n" +
        "Meg Griffin who owns : Tweety" +
        "\n" +
        "Chris Griffin who owns : Speedy" +
        "\n" +
        "Cleveland Brown who owns : Fuzzy Wuzzy" +
        "\n" +
        "Glenn Quagmire"
    );
  });
});

const formatPopulation = (population: Person[]): string => {
  let response = "";

  response = population
    .map((person) => {
      let personInfo = `${person.firstName} ${person.lastName}`;
      if (person.pets.length > 0) {
        personInfo +=
          " who owns : " + person.pets.map((pet) => pet.name).join(" ");
      }
      return personInfo;
    })
    .join("\n");
  return response;
};

const comparePetAgeForPersons = (p1: Person, p2: Person) => {
  if (youngestPetAgeForThePerson(p1) < youngestPetAgeForThePerson(p2))
    return -1;
  if (youngestPetAgeForThePerson(p1) <= youngestPetAgeForThePerson(p2))
    return 0;
  return 1;
};

const youngestPetAgeForThePerson = (person: Person) =>
  person.pets.sort(ageDifference)[0]?.age ?? Number.MAX_VALUE;

const ageDifference = (pet1: Pet, pet2: Pet) => pet1.age - pet2.age;
