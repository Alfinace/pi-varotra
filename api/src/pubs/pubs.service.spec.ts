import { Test, TestingModule } from '@nestjs/testing';
import { PubsService } from './pubs.service';

describe('PubsService', () => {
  let service: PubsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubsService],
    }).compile();

    service = module.get<PubsService>(PubsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
