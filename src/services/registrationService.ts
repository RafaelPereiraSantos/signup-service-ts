import { Injectable } from '@nestjs/common';
import { serialize } from "class-transformer";
import fetch from 'node-fetch'

import { EndUserRegister } from '../models/endUserRegister';
import { EndUserResponse } from '../models/endUserResponse';

@Injectable()
export class RegistrationService {

  // TODO move url to a dotenv

  private readonly registrationHost = "http://localhost:3001/register"

  async register(endUser: EndUserRegister): Promise<EndUserResponse> {
    const payload = this.preparePayload(endUser);
    const response = this.postRegister(payload);
    return response
  }

  private preparePayload(endUser: EndUserRegister): String {
    return serialize(endUser.registerDataJson());
  }

  private async postRegister(payload: String): Promise<EndUserResponse> {
    const rawResponse = await fetch(this.registrationHost, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: String(payload)
    });

    return new EndUserResponse(
      rawResponse['id'],
      rawResponse['name'],
      rawResponse['email'],
      rawResponse['personalDocument']
    );
  }

  private handleResponse(response) {

  }
}
