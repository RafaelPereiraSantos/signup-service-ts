import { Injectable } from '@nestjs/common';
import { serialize } from "class-transformer";
import fetch from 'node-fetch'

import { Eligible } from '../models/eligible';

@Injectable()
export class AssociationService {

  // TODO move url to a dotenv

  private readonly associationHost = "http://localhost:3001/associate"

  async associate(eligible: Eligible) {
    const payload = this.preparePayload(eligible);
    console.log(payload)
    const response = this.requestAssociation(payload);
    return response
  }

  private preparePayload(eligible: Eligible): String {
    return serialize(eligible.associationDataJson());
  }

  private async requestAssociation(payload: String): Promise<Object> {
    const response = await fetch(this.associationHost, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: String(payload)
    });

    return response.json()
  }

  private handleResponse(response) {

  }
}
