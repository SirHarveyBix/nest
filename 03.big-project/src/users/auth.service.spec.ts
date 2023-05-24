import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserSerivce: Partial<UsersService>;
  const users: UserEntity[] = [];

  beforeEach(async () => {
    fakeUserSerivce = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        } as UserEntity;

        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserSerivce,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with salted & hashed password', async () => {
    const user = await service.signup('test@test.com', 'pass');
    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual('pass');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if signup with already existing email', async () => {
    await service.signup('test@test.fr', 'pass');

    await expect(service.signup('test@test.com', 'pass')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if signin is called with unused email', async () => {
    await expect(
      service.signin('unused@email.com', 'any-password123'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws an error if an invalid password is provided', async () => {
    await service.signup('user@fail.fr', 'good-password');

    await expect(
      service.signin('user@fail.fr', 'wrong-password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('user@test.fr', 'good-password');

    const user = await service.signin('user@test.fr', 'good-password');
    expect(user).toBeDefined();
  });
});
