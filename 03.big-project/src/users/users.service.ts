import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    this.repo.save(user);
    // this.repo.save({ email, password }); => does not execute Hook (like: @AfterInsert())
    // it needs to recieve a plain object
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const userToUpdate = await this.repo.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException();
    }

    Object.assign(userToUpdate, attrs);
    return this.repo.save(userToUpdate);
  }

  async remove(id: number) {
    const userToRemove = await this.repo.findOneBy({ id });
    if (!userToRemove) {
      throw new NotFoundException();
    }

    return this.repo.remove(userToRemove);
  }
}
