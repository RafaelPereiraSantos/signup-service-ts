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
import { Expose, plainToClass } from "class-transformer";

import { AssociationService } from './associationService';
import { Eligible } from './eligible';

@Controller('/')
export class AppController {
  constructor(private readonly service: AssociationService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('associate')
  postAssociate(@Body() eligibleParams: Eligible): Eligible {
    const eligible = plainToClass(Eligible, eligibleParams)

    if (eligible.noAssociationDataAvailable()) {
      throw new HttpException(
        'Required at least one parameter: email, personal document or token', HttpStatus.BAD_REQUEST
      );
    }

    this.service.associate(eligible);
    return eligible;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  postRegister(@Body() eligibleParams: Eligible): Eligible {
    const eligible = plainToClass(Eligible, eligibleParams)

    if (eligible.noRegisterDataAvailable()) {
      throw new HttpException(
        'Name, email and password are mandatory parameters!', HttpStatus.BAD_REQUEST
      );
    }

    // call register service

    return eligible;
  }

  @Get('eligiblity')
  getEligiblity(
    @Body() eligible: Eligible,
    @Query('email') email
  ): Eligible {

    // call search service

    return(eligible);
  }
}
