import { Test, TestingModule } from '@nestjs/testing';
import { JoeResService } from './joe-res.service';

describe('JoeResService', () => {
  let service: JoeResService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoeResService],
    }).compile();

    service = module.get<JoeResService>(JoeResService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
