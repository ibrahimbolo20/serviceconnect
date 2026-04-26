import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

 async login(email: string, password: string) {
  const user = await this.userService.findByEmail(email);

  if (!user || !user.password) {
    return { message: 'User not found or password missing' };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { message: 'Wrong password' };
  }

  const token = this.jwtService.sign({
    id: user.id,
    email: user.email,
  });

  return {
    access_token: token,
  };
}
  
}