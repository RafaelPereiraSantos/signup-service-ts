import {
  Controller,
  Post,
  Get,
  Req,
  Param,
  Body,
  HttpCode,
  Query,
  HttpStatus,
  HttpException
} from '@nestjs/common';

import { Request } from 'express';
import { Expose, plainToClass, serialize, deserialize } from "class-transformer";

import { AssociationService } from './services/associationService';
import { EligibilitySearchService } from './services/eligibilitySearchService';
import { RegistrationService } from './services/registrationService';
import { Eligible } from './models/eligible';
import { EndUserRegister } from './models/endUserRegister';
import { EndUserResponse } from './models/endUserResponse';


@Controller('/')
export class AppController {
  constructor(
    private readonly associationService: AssociationService,
    private readonly registerService: RegistrationService,
    private readonly eligibilitySearchService: EligibilitySearchService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('associate')
  async postAssociate(@Body() eligibleParams: Eligible): Promise<Object> {
    const eligible = plainToClass(Eligible, eligibleParams)

    // TODO improve this check with a middleware or interceptor

    if (eligible.noAssociationDataAvailable()) {
      throw new HttpException(
        'Required at least one parameter: email, personal document or token', HttpStatus.BAD_REQUEST
      );
    }

    const response = await this.associationService.associate(eligible);
    return serialize(response);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async postRegister(@Body() endUserParams: EndUserRegister): Promise<Object> {
    const endUser = plainToClass(EndUserRegister, endUserParams)

    if (endUser.noRegisterDataAvailable()) {
      throw new HttpException(
        'Name, email and password are mandatory parameters!', HttpStatus.BAD_REQUEST
      );
    }

    const response = await this.registerService.register(endUser);
    return serialize(response.responseDataJson());
  }

  @Get('eligiblity')
  async getEligiblity(
    @Query('email') email,
    @Query('token') token,
    @Query('personal_document') personalDocument
  ): Promise<Object> {
    const eligible = new Eligible('teste user', email, token, personalDocument);
    const response = await this.eligibilitySearchService.search(eligible);

    return serialize(response);
  }
}
