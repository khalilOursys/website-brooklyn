import { Test, TestingModule } from '@nestjs/testing';
import { HeroBannerController } from './hero-banner.controller';
import { HeroBannerService } from './hero-banner.service';

describe('HeroBannerController', () => {
  let controller: HeroBannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroBannerController],
      providers: [HeroBannerService],
    }).compile();

    controller = module.get<HeroBannerController>(HeroBannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
