import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app/app.module'; 

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup ', () => {
    const email = 'wowww@wwe.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'erewte4t', confirmPassword: 'erewte4t' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get User', async () => {
    const email = 'joew@joew.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '4yfgre', confirmPassword: '4yfgre' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
