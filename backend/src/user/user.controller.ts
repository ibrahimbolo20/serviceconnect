import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  // 🔐 ROUTE PROTÉGÉE
  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req) {
    return {
      message: 'User connecté',
      user: req.user,
    };
  }
}