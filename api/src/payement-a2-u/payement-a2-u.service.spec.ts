import { Test, TestingModule } from '@nestjs/testing';
import { PayementA2UService } from './payement-a2-u.service';

describe('PayementA2UService', () => {
  let service: PayementA2UService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayementA2UService],
    }).compile();

    service = module.get<PayementA2UService>(PayementA2UService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
