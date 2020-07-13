import { Controller, Post, Get, Req, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {Expose, plainToClass} from "class-transformer";

class CreateCatDto {
  @Expose({ name: "full_name" })
  fullName  : string;
  age: number;
  breed?: string;
}

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('all')
  getHello(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto)
    return this.appService.getHello();
  }
}
