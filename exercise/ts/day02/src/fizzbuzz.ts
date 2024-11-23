const MAXIMUM = 100;
const MINIMUM = 0;
const FIZZ = 5;
const BUZZ = 3;
const FIZZBUZZ = 15;

export function fizzbuzz(input: number): string | number {
  checkInputRange(input);

  if (isFizzBuzz(input)) {
    return "FizzBuzz";
  }
  if (isBuzz(input)) {
    return "Fizz";
  }
  if (isFizz(input)) {
    return "Buzz";
  }
  return input;
}

function checkInputRange(input: number): void {
  if (isOutOfRange(input)) {
    throw new Error("Input is out of range");
  }
}

const isOutOfRange = (input: number) => input <= MINIMUM || input > MAXIMUM;

const isMultipleOf = (divisor: number) => (input: number) =>
  input % divisor === 0;

const isFizz = isMultipleOf(FIZZ);

const isBuzz = isMultipleOf(BUZZ);

const isFizzBuzz = isMultipleOf(FIZZBUZZ);
