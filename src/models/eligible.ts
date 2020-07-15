import { Expose } from "class-transformer";
import { EligibleCreatedEvent } from './eligibleCreatedEvent';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class Eligible {

  name?: String;

  @Expose({ name: "email_address" })
  emailAddress?: String;

  token?: String;

  @Expose({ name: "personal_document" })
  personalDocument?: String;

  @IsNotEmpty()
  @Expose({ name: "company_id" })
  companyId?: number

  constructor(
    name?: String,
    emailAddress?: String,
    token?: String,
    personalDocument?: String,
    companyId?: number
  ) {
    this.name = name;
    this.emailAddress = emailAddress;
    this.token = token;
    this.personalDocument = personalDocument;
    this.companyId = companyId;
  }

  noAssociationDataAvailable() {
    return this.emailAddress === undefined &&
             this.token === undefined &&
             this.personalDocument === undefined;
  }

  associationDataJson(): Object {
    return {
      email_address: this.emailAddress,
      company_member_token: this.token,
      personal_document: this.personalDocument,
      company_id: this.companyId
    }
  }

  eligibleDataJson(): Object {
    return {
      email_address: this.emailAddress,
      employee_id: this.token,
      document: this.personalDocument
    }
  }

  companyMemberDataJson(): Object {
    return {
      email_address: this.emailAddress,
      company_member_token: this.token,
      personal_document: this.personalDocument
    }
  }

  static fromEvent(event: EligibleCreatedEvent): Eligible {
    return new Eligible(
        event.name,
        event.emailAddress,
        event.token,
        event.personalDocument
    )
  }
}
