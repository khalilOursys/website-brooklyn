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

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // Inject the JwtService for token creation
  ) {}
  async onModuleInit() {
    await this.ensureAdminUserExists();
  }

  private async ensureAdminUserExists() {
    const adminEmail = 'admin.admin@admin.com'; // or from config
    const adminPassword = 'adminadmin'; // or from config

    const usersCount = await this.prisma.user.count();

    if (usersCount === 0) {
      const adminUserDto: CreateUserDto = {
        email: adminEmail,
        password: adminPassword,
        name: 'Admin',
        firstName: 'Admin',
        lastName: 'Admin',
        role: Role.ADMIN,
        // add other required fields
      };

      await this.create(adminUserDto);
    }
  }
  async create(createUserDto: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('E-mail déjà utilisé');
    }
    // Hash the password using bcrypt
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
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Compare the incoming password with the hashed password
    const isMatch = await bcryptjs.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Generate JWT token with necessary payload
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
      },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  async getAllUsers(role?: Role) {
    return this.prisma.user.findMany({
      where: role ? { role } : undefined, // Filter by role if provided
      include: {
        bulkRequests: true, // Include the related BulkRequest
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        bulkRequests: true, // Include the related category
      },
    });
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      // Fetch the existing user from the database
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // If no new password is provided, retain the old password
      if (!updateUserDto.password || updateUserDto.password.trim() === '') {
        updateUserDto.password =
          existingUser.password || updateUserDto.password;
      } else {
        // Hash the new password if provided
        const saltRounds = 10; // Number of salt rounds for hashing
        updateUserDto.password = await bcryptjs.hash(
          updateUserDto.password,
          saltRounds,
        );
      }

      // Update the user with the new data
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

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    // Find the user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(newPassword, saltRounds);

    // Update the password and clear any reset tokens if needed
    user.password = hashedPassword;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
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
        isActive: updatedUser.isActive, // Return new status
      };
    } catch (error) {
      return { success: false, status: HttpStatus.FORBIDDEN };
    }
  }
}
