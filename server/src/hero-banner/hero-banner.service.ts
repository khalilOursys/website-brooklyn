import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHeroBannerDto } from './dto/create-hero-banner.dto';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HeroBannerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHeroBannerDto: CreateHeroBannerDto) {
    // Check if a heroBanner with the same name already exists
    const existing = await this.prisma.heroBanner.findUnique({
      where: { name: createHeroBannerDto.name },
    });
    if (existing) {
      throw new BadRequestException(
        `HeroBanner with name "${createHeroBannerDto.name}" already exists.`,
      );
    }
    return await this.prisma.heroBanner.create({
      data: createHeroBannerDto,
    });
  }

  async findAll() {
    return await this.prisma.heroBanner.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const heroBanner = await this.prisma.heroBanner.findUnique({
      where: { id },
    });
    if (!heroBanner) {
      throw new NotFoundException(`HeroBanner with id ${id} not found.`);
    }
    return heroBanner;
  }

  async update(id: string, updateHeroBannerDto: UpdateHeroBannerDto) {
    // Ensure the heroBanner exists before updating
    await this.findOne(id);
    return await this.prisma.heroBanner.update({
      where: { id },
      data: updateHeroBannerDto,
    });
  }

  async remove(id: string) {
    // Ensure the heroBanner exists before deletion
    await this.findOne(id);
    return await this.prisma.heroBanner.delete({
      where: { id },
    });
  }
}
