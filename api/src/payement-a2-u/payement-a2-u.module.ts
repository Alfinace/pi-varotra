import { Module } from '@nestjs/common';
import { PayementA2UService } from './payement-a2-u.service';
import { PayementA2UController } from './payement-a2-u.controller';

@Module({
  controllers: [PayementA2UController],
  providers: [PayementA2UService]
})
export class PayementA2UModule {}
