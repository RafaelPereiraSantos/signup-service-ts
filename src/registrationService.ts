import { Injectable } from '@nestjs/common';
import { serialize } from "class-transformer";
import fetch from 'node-fetch'

import { EndUserRegister } from './endUserRegister';

@Injectable()
export class RegistrationService {

  // TODO move url to a dotenv

  private readonly registrationHost = "http://localhost:3001/register"

  async register(endUser: EndUserRegister) {
    const payload = this.preparePayload(endUser);
    console.log(payload)
    const response = this.requestAssociation(payload);
    return response
  }

  private preparePayload(endUser: EndUserRegister): String {
    return serialize(endUser.registerDataJson());
  }

  private async requestAssociation(payload: String): Promise<Object> {
    const response = await fetch(this.registrationHost, {
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
