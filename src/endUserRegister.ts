import { Expose } from "class-transformer";
import { EligibleCreatedEvent } from './eligibleCreatedEvent';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EndUserRegister {

  @IsNotEmpty()
  name?: String;

  @IsNotEmpty()
  @Expose({ name: "email_address" })
  emailAddress?: String;

  @IsNotEmpty()
  password?: String;

  @Expose({ name: "personal_document" })
  personalDocument?: String;

  constructor(
    name?: String,
    emailAddress?: String,
    password?: String,
    personalDocument?: String
  ) {
    this.name = name;
    this.emailAddress = emailAddress;
    this.password = password;
    this.personalDocument = personalDocument;
  }

  noRegisterDataAvailable() {
    return this.name === undefined ||
             this.emailAddress === undefined ||
             this.password === undefined;
  }

  registerDataJson(): Object {
    return {
      name: this.name,
      email_address: this.emailAddress,
      personal_document: this.personalDocument,
      password: this.password
    }
  }
}
