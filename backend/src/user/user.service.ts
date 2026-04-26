import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

 findByEmail(email: string) {
  return this.userRepo.findOne({
    where: { email },
    select: ['id', 'name', 'email', 'password'], // 🔥 IMPORTANT
  });
}

  async create(data: any) {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      return {
        statusCode: 400,
        message: 'Email déjà utilisé',
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }
}