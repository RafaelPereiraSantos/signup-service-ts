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
import { Expose, plainToClass, serialize } from "class-transformer";

import { AssociationService } from './associationService';
import { RegistrationService } from './registrationService';
import { Eligible } from './eligible';
import { EndUserRegister } from './endUserRegister';

@Controller('/')
export class AppController {
  constructor(
    private readonly associationService: AssociationService,
    private readonly registerService: RegistrationService
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
    return JSON.stringify(response)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  postRegister(@Body() eligibleParams: EndUserRegister): String {
    const eligible = plainToClass(EndUserRegister, eligibleParams)

    if (eligible.noRegisterDataAvailable()) {
      throw new HttpException(
        'Name, email and password are mandatory parameters!', HttpStatus.BAD_REQUEST
      );
    }

    registerService.register()

    // TODO implement a register service

    return serialize(eligible.registerDataJson());
  }

  @Get('eligiblity')
  getEligiblity(
    @Body() eligible: Eligible,
    @Query('email') email
  ): String {

    // TODO implement a search service

    return serialize(eligible);
  }
}
