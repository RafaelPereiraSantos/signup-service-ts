import { EligibleCreatedEvent } from './eligibleCreatedEvent';

export class Eligible {
  constructor(
    public name?: String,
    public emailAddress?: String,
    public token?: String,
    public personalDocument?: String,
  ) {}

  static fromEvent(event: EligibleCreatedEvent): Eligible {
    return new Eligible(
      event.name,
      event.emailAddress,
      event.token,
      event.personalDocument
    )
  }
}
