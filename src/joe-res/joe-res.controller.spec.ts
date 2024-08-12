import { Test, TestingModule } from '@nestjs/testing';
import { JoeResController } from './joe-res.controller';
import { JoeResService } from './joe-res.service';

describe('JoeResController', () => {
  let controller: JoeResController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoeResController],
      providers: [JoeResService],
    }).compile();

    controller = module.get<JoeResController>(JoeResController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
