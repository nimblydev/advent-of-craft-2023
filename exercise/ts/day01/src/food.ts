type Maybe<T> = NonNullable<T> | null;

export class Food {
  constructor(
    public readonly expirationDate: Date,
    public readonly isSafeForConsumption: boolean,
    public readonly inspectorId: Maybe<string>
  ) {}

  isEdible(now: () => Date): boolean {
    return this.isFresh(now) && this.canBeConsumed() && this.hasBeenInspected();
  }

  private canBeConsumed() {
    return this.isSafeForConsumption;
  }

  private hasBeenInspected(): boolean {
    return this.inspectorId !== null;
  }

  private isFresh(now: () => Date) {
    return this.expirationDate > now();
  }
}
