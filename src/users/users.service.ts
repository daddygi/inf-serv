import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Accounts } from './user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = Accounts.create({ ...createUserDto });
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<Accounts> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    const options: FindOneOptions<Accounts> = {
      where: {
        id: id,
      },
    };
    return await Accounts.findOne(options);
  }

  async findByEmail(email: string) {
    return await Accounts.findOne({
      where: {
        email: email,
      },
    });
  }
}
