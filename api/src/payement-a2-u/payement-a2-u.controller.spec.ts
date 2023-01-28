import { Test, TestingModule } from '@nestjs/testing';
import { PayementA2UController } from './payement-a2-u.controller';
import { PayementA2UService } from './payement-a2-u.service';

describe('PayementA2UController', () => {
  let controller: PayementA2UController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayementA2UController],
      providers: [PayementA2UService],
    }).compile();

    controller = module.get<PayementA2UController>(PayementA2UController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
