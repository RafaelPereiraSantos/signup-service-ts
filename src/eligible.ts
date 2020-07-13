import { Expose } from "class-transformer";
import { EligibleCreatedEvent } from './eligibleCreatedEvent';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class Eligible {

  name?: String;

  @Expose({ name: "email_address" })
  emailAddress?: String;

  password?: String;

  token?: String;

  @Expose({ name: "personal_document" })
  personalDocument?: String;

  constructor(
    name?: String,
    emailAddress?: String,
    password?: String,
    token?: String,
    personalDocument?: String
  ) {
    this.name = name;
    this.emailAddress = emailAddress;
    this.password = password;
    this.token = token;
    this.personalDocument = personalDocument;
  }

  noAssociationDataAvailable() {
    return this.emailAddress === undefined &&
             this.token === undefined &&
             this.personalDocument === undefined;
  }

  noRegisterDataAvailable() {
    return this.name === undefined ||
             this.emailAddress === undefined ||
             this.password === undefined;
  }

  associationDataJson(): Object {
    return {
      email_address: this.emailAddress,
      token: this.token,
      personal_document: this.personalDocument
    }
  }

  static fromEvent(event: EligibleCreatedEvent): Eligible {
    return new Eligible(
        event.name,
        event.emailAddress,
        "",
        event.token,
        event.personalDocument
    )
  }
}
