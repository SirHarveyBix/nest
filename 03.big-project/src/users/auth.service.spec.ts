import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserSerivce: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserSerivce = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as UserEntity),
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
    const user = await service.signup('test@test', 'pass');
    expect(user.password).not.toEqual('pass');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if signing up with already existing email', async () => {
    fakeUserSerivce.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as UserEntity]);

    await expect(service.signup('test@test', 'pass')).rejects.toThrow(
      BadRequestException,
    );
  });
});
