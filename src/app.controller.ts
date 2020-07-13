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
import { Eligible } from './eligible';

@Controller('/')
export class AppController {
  constructor(private readonly service: AssociationService) {}

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
    const response = await this.service.associate(eligible);
    return JSON.stringify(response)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  postRegister(@Body() eligibleParams: Eligible): String {
    const eligible = plainToClass(Eligible, eligibleParams)

    if (eligible.noRegisterDataAvailable()) {
      throw new HttpException(
        'Name, email and password are mandatory parameters!', HttpStatus.BAD_REQUEST
      );
    }

    // TODO implement a register service

    return serialize(eligible);
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
