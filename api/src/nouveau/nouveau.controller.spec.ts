import { Test, TestingModule } from '@nestjs/testing';
import { NouveauController } from './nouveau.controller';
import { NouveauService } from './nouveau.service';

describe('NouveauController', () => {
  let controller: NouveauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NouveauController],
      providers: [NouveauService],
    }).compile();

    controller = module.get<NouveauController>(NouveauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
