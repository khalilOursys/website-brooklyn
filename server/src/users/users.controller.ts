import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { MailerService } from 'src/mailer/mailer.services';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // Omit sensitive fields (like password) in the response
    const { password, ...result } = user;
    return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getAllUsers(@Query('role') role?: Role) {
    return this.usersService.getAllUsers(role);
  }
  @Get('getUserById/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.updateUser(id, updateUserDto);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  @Put('toggle-status/:id')
  async toggleStatus(@Param('id') id: string) {
    const result = await this.usersService.toggleStatus(id);
    return {
      success: result.success,
      isActive: result.isActive,
      statusCode: result.status,
    };
  }

  @Post('/contact')
  contact(
    @Body()
    body: {
      email: string;
      nom: string;
      prenom: string;
      msg: string;
    },
  ) {
    const { email, nom, prenom, msg } = body;
    var to = process.env.contact_us || 'shadowreaperguide@gmail.com';
    return this.mailerService.sendContactEmail(email, nom, prenom, msg, to);
  }
}
