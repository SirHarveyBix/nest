import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

it('can create instance of auth service', async () => {
  const fakeUserSerivce = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UsersService, useValue: fakeUserSerivce },
    ],
  }).compile();
  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
