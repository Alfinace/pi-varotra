import { Test, TestingModule } from '@nestjs/testing';
import { NouveauService } from './nouveau.service';

describe('NouveauService', () => {
  let service: NouveauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NouveauService],
    }).compile();

    service = module.get<NouveauService>(NouveauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
