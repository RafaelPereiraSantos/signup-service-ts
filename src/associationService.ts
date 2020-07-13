import { Injectable } from '@nestjs/common';

import { Eligible } from './eligible';

@Injectable()
export class AssociationService {
  associate(eligible: Eligible) {
    console.log(eligible)
  }
}
