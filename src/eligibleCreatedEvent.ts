import { Expose, plainToClass } from "class-transformer";

export class EligibleCreatedEvent {
    name?: String;

    @Expose({ name: "email_address" })
    emailAddress?: String;

    token?: String;

    @Expose({ name: "personal_document" })
    personalDocument?: String;
}
