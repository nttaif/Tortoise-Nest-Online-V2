import { Module } from '@nestjs/common';
import { CognitoGroupService } from './cognito.group.service';

@Module({
  providers: [CognitoGroupService],
  exports: [CognitoGroupService],
})
export class CognitoGroupModule {}
