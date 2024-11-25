import { Person, PersonBuilder, Pet, PetBuilder, PetType } from "../src/people";

describe("population", () => {
  let population: Person[];

  beforeEach(() => {
    population = [
      PersonBuilder.aPerson()
        .withFirstName("Peter")
        .withLastName("Griffin")
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Cat)
            .withName("Tabby")
            .withAge(2)
            .build()
        )
        .build(),

      PersonBuilder.aPerson()
        .withFirstName("Stewie")
        .withLastName("Griffin")
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Cat)
            .withName("Dolly")
            .withAge(3)
            .build()
        )
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Dog)
            .withName("Brian")
            .withAge(9)
            .build()
        )
        .build(),

      PersonBuilder.aPerson()
        .withFirstName("Joe")
        .withLastName("Swanson")
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Dog)
            .withName("Spike")
            .withAge(4)
            .build()
        )
        .build(),

      PersonBuilder.aPerson()
        .withFirstName("Lois")
        .withLastName("Griffin")
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Snake)
            .withName("Serpy")
            .withAge(1)
            .build()
        )
        .build(),

      PersonBuilder.aPerson()
        .withFirstName("Meg")
        .withLastName("Griffin")
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Bird)
            .withName("Tweety")
            .withAge(1)
            .build()
        )

        .build(),

      PersonBuilder.aPerson()
        .withFirstName("Chris")
        .withLastName("Griffin")
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Turtle)
            .withName("Speedy")
            .withAge(4)
            .build()
        )
        .build(),

      PersonBuilder.aPerson()
        .withFirstName("Cleveland")
        .withLastName("Brown")
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Hamster)
            .withName("Fuzzy")
            .withAge(1)
            .build()
        )
        .withPet(
          PetBuilder.aPet()
            .withType(PetType.Hamster)
            .withName("Wuzzy")
            .withAge(2)
            .build()
        )
        .build(),

      PersonBuilder.aPerson()
        .withFirstName("Glenn")
        .withLastName("Quagmire")
        .build(),
    ];
  });

  test("Lois owns the youngest pet", () => {
    const sorted = population.toSorted(compareByYoungestPetAge);
    const filtered = sorted.at(0);

    expect(filtered).not.toBeNull();
    expect(filtered?.firstName).toBe("Lois");
  });

  test("Lois owns the youngest pet (with stream)", () => {
    const filteredPerson = population
      .map((p) => ({
        ...p,
        youngestPetAge: Math.min(...p.pets.map((pet) => pet.age)),
      }))
      .toSorted((p1, p2) => p1.youngestPetAge - p2.youngestPetAge)
      .at(0);

    expect(filteredPerson).not.toBeNull();
    expect(filteredPerson?.firstName).toBe("Lois");
  });
});

const compareByYoungestPetAge = (p1: Person, p2: Person): number => {
  if (getYoungestPetAge(p1) < getYoungestPetAge(p2)) {
    return -1;
  }
  if (getYoungestPetAge(p1) > getYoungestPetAge(p2)) {
    return 1;
  }
  return 0;

  function getYoungestPetAge(p1: Person): number {
    return p1.pets.sort(comparePetAgeAscending).at(0)?.age ?? Number.MAX_VALUE;
  }
};

const comparePetAgeAscending = (petA: Pet, petB: Pet): number =>
  petA.age - petB.age;
