import { Injectable } from '@nestjs/common';
import { serialize } from "class-transformer";
import fetch from 'node-fetch'
import { URL, URLSearchParams } from 'url';
import { HttpException } from '@nestjs/common';

import { Eligible } from '../models/eligible';

@Injectable()
export class EligibilitySearchService {

  // TODO move url to a dotenv

  private readonly eligibleHost = "http://localhost:3001/eligibles";
  private readonly companyMemberHost = "http://localhost:3001/company-members";

  async search(eligible: Eligible): Promise<Eligible> {

    // TODO handle possible errors in fetch

    const elibleResponse = this.searchInEligibleService(eligible);
    // const companyMemberResponse = this.searchInCompanyMemberService(eligible);
    return elibleResponse;
  }

  private async searchInEligibleService(eligible: Eligible): Promise<Eligible> {
    const url = new URL(this.eligibleHost);
    const params = {
      email_address: String(eligible.emailAddress),
      employee_id: String(eligible.token),
      document: String(eligible.personalDocument)
    };
    url.search = new URLSearchParams(params).toString();

    const formatter = (body: Object): Eligible => {
      return new Eligible(
      '',
      body['email_address'],
      body['employee_id'],
      body['document'],
      body['company_id']
    );
    }

    return await this.makeFetch(url, formatter);
  }

  private async searchInCompanyMemberService(eligible: Eligible): Promise<Eligible> {
    const url = new URL(this.companyMemberHost);
    const params = {
      email_address: String(eligible.emailAddress),
      employee_id: String(eligible.token),
      document: String(eligible.personalDocument)
    };
    url.search = new URLSearchParams(params).toString();

    const formatter = (body: Object): Eligible => {
      return new Eligible(
        '',
        body['email_address'],
        body['token'],
        body['cpf'],
        body['company_id']
      );
    }

    return await this.makeFetch(url, formatter);
  }

  private async makeFetch(url: URL, format: (body: Object) => Eligible): Promise<Eligible> {
    const rawResponse = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await rawResponse.json()
    return format(body);
  }

  private handleResponse(response) {

  }
}
