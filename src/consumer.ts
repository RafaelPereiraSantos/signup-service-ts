import * as AmqpLib from "amqplib/callback_api";
import { plainToClass } from "class-transformer";

import { AssociationService } from './associationService';
import { Eligible } from './models/eligible';
import { EligibleCreatedEvent } from './models/eligibleCreatedEvent';

export class Consumer {

  constructor(
    // TODO move url to a dotenv
    private readonly url: String = 'amqp://localhost'
  ) {}

  private readonly queue: String = 'eligible_created';
  private readonly service: AssociationService = new AssociationService

  up(): void {
    const url = this.url;
    const queue = this.queue;

    const processMessage = (message: String) => {
      this.associateEligible(
        this.parseMessage(message)
      )
    }

    // TODO delete message after use
    // TODO implement a retry/dead-letter system

    AmqpLib.connect(url, (error, connection) => {
      connection.createChannel((error, channel) => {

        channel.assertQueue(queue, {
            durable: true
        });

        channel.prefetch(1);

        console.log("I'm alive!", queue);

        channel.consume(queue, (msg) => {
          console.log("Message received");
          processMessage(msg.content);
          // channel.ack(msg);
        }, {
            noAck: true
        });
      });
    });
  }

  private parseMessage(message: String): EligibleCreatedEvent {
    return plainToClass(EligibleCreatedEvent, JSON.parse(String(message)));
  }

  private associateEligible(event: EligibleCreatedEvent) {
    this.service.associate(Eligible.fromEvent(event))
  }
}
