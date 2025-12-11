// users.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UpdateUserCitiesDto } from './dto/update-user-cities.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.ensureAdminUserExists();
  }

  private async ensureAdminUserExists() {
    const adminEmail = 'admin.admin@admin.com';
    const adminPassword = 'adminadmin';

    const usersCount = await this.prisma.user.count();

    if (usersCount === 0) {
      const adminUserDto: CreateUserDto = {
        email: adminEmail,
        password: adminPassword,
        name: 'Admin',
        firstName: 'Admin',
        lastName: 'Admin',
        role: Role.ADMIN,
      };

      await this.create(adminUserDto);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail déjà utilisé');
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        telephone: createUserDto.telephone,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        role: createUserDto.role,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcryptjs.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        cart: {
          include: {
            items: true,
          },
        },
        bulkRequests: true,
        userCities: {
          include: {
            city: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async getAllUsers(role?: Role) {
    return this.prisma.user.findMany({
      where: role ? { role } : undefined,
      include: {
        bulkRequests: true,
        userCities: {
          include: {
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        bulkRequests: true,
        userCities: {
          include: {
            city: true,
          },
        },
      },
    });
  }

  async getUserWithCities(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userCities: {
          include: {
            city: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      if (!updateUserDto.password || updateUserDto.password.trim() === '') {
        updateUserDto.password =
          existingUser.password || updateUserDto.password;
      } else {
        updateUserDto.password = await bcryptjs.hash(
          updateUserDto.password,
          10,
        );
      }

      return await this.prisma.user.update({
        where: { id: userId },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      throw error;
    }
  }

  async updateUserCities(
    userId: string,
    updateUserCitiesDto: UpdateUserCitiesDto,
  ) {
    try {
      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Use transaction for consistency
      return await this.prisma.$transaction(async (prisma) => {
        // Delete existing user cities
        await prisma.userCity.deleteMany({
          where: { userId },
        });

        // Verify all cities exist before creating
        const cities = await prisma.city.findMany({
          where: {
            id: { in: updateUserCitiesDto.cityIds },
          },
        });

        if (cities.length !== updateUserCitiesDto.cityIds.length) {
          throw new NotFoundException('One or more cities not found');
        }

        // Create new user cities
        const newUserCities = await Promise.all(
          updateUserCitiesDto.cityIds.map((cityId) =>
            prisma.userCity.create({
              data: {
                userId,
                cityId,
              },
            }),
          ),
        );

        return newUserCities;
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User or City not found`);
      }
      throw error;
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async toggleStatus(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        return { success: false, status: HttpStatus.NOT_FOUND };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { isActive: !user.isActive },
      });

      return {
        success: true,
        status: HttpStatus.OK,
        isActive: updatedUser.isActive,
      };
    } catch (error) {
      return { success: false, status: HttpStatus.FORBIDDEN };
    }
  }
}
