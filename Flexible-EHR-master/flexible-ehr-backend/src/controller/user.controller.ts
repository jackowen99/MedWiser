import { Body, Controller, Get, Param, Patch, Post, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

class loginBody {
  name: string;
  password: string;
}

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {

    let user = await this.userRepository.findOne({
      name: username,
    });

    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'can\'t find this username',
      }, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post('login')
  async login(@Body() body: loginBody) {
    let user = await this.userRepository.findOne({
      name: body.name,
    });
    try {
      if (await this.compareHash(body.password, user.password)) {
        return user;
      } else {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'wrong username or password',
        }, HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'wrong username or password',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post('register')
  async register(@Body() user: User) {
    user.password = await this.getHash(user.password);
    user.data = {
      'panels': [],
      'data': {},
    };

    return this.userRepository.save(user).catch(e => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'username already exists',
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Patch(':userId')
  async patchUser(@Param('userId') userId: number, @Body() body: any) {
    await this.userRepository.update(userId, { data: body });
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

