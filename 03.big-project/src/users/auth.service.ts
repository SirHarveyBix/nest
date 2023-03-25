import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt, BinaryLike } from 'crypto';
import { promisify } from 'util';

// eslint-disable-next-line prettier/prettier
type Scrypt = (
  arg1: BinaryLike,
  arg2: BinaryLike,
  arg3: number,
) => Promise<unknown>;

// tranforme scrypt pour retourner une promesse plutot qu'une fonctoin asynchrone
const scrypt: Scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.usersService.find(email);
    if (user.length) {
      throw new BadRequestException('email already in use');
    }

    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const userToSave = this.usersService.create(email, result);
    return userToSave;
  }

  signin() {}
}
