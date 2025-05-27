import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
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

  async create(createUserDto: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
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
}
