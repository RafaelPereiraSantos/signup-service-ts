import { Expose } from "class-transformer";
import { EligibleCreatedEvent } from './eligibleCreatedEvent';

export class EndUserResponse {

  id: number;
  name: String;
  emailAddress: String;
  personalDocument?: String;

  constructor(
    id: number,
    name: String,
    emailAddress: String,
    personalDocument?: String
  ) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
    this.personalDocument = personalDocument;
  }

  responseDataJson(): Object {
    return {
      id: this.id,
      name: this.name,
      email_address: this.emailAddress,
      personal_document: this.personalDocument,
    }
  }
}
