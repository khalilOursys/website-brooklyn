import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Optionally check for duplicate name (unique constraint)
    const existing = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });
    if (existing) {
      throw new BadRequestException(
        `Category with name "${createCategoryDto.name}" already exists.`,
      );
    }
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // Ensure the category exists
    await this.findOne(id);
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    // Ensure the category exists before deletion
    await this.findOne(id);
    return await this.prisma.category.delete({
      where: { id },
    });
  }

  async getCategoriesStructured() {
    // Fetch parent categories with their child categories
    const categories = await this.prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
    });

    // Transform the categories into the desired format
    return categories.map((category) => ({
      heading: category.name,
      links: category.children.map((child) => ({
        href: `/category/${child.slug || child.name.toLowerCase().replace(/\s+/g, '-')}`,
        text: child.name,
      })),
    }));
  }

  async findAllChildren() {
    return await this.prisma.category.findMany({
      where: {
        parentId: {
          not: null,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllParent() {
    return await this.prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
