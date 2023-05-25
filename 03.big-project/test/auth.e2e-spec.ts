import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication', () => {
  let app: INestApplication;
  const createdEmail = 'test@test.test';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const signup = async (email = 'test@test.test') => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'pass' })
      .expect(201);
  };

  it('POST - signup : /auth/signup', async () => {
    return signup().then((response) => {
      const { id, email } = response.body;
      expect(id).toBeDefined();
      expect(email).toEqual(createdEmail);
    });
  });

  it('GET - current user : /auth/whoami', async () => {
    const response = await signup();
    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(createdEmail);
  });
});
