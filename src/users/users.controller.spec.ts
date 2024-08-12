import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import User from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      read: (email: string) => {
        //  const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve([{ id: 1, email, password: 'sada' }]);
      },
      //  create: (email: string, password: string) => {
      //    const user = {
      //      id: Math.floor(Math.random() * 999999),
      //      email,
      //      password,
      //    } as User;
      //    users.push(user);
      //    return Promise.resolve(user);
      //  },
      //  delete:()=>{},
      //  update:()=>{},
      readOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'e@e.com',
          password: 'sada',
        } as User);
      },
    };
    fakeAuthService = {
      //  signIn: () => {},
      //  signUp: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('finds All users returns a list of useres ', async () => {
    const users = await controller.getUsers('a@a.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('a@a.com');
  });
  it('finds a user return a user ', async () => {
    const user = await controller.getOneUser(1);
    expect(user.id).toEqual(1);
    expect(user).toBeDefined();
  });
  // it('throw an error if the user with a given Id was not found', (done) => {
  //   fakeUsersService.readOne = () => Promise.resolve(null);
  //   controller
  //     .getOneUser(1)
  //     .then(() => {
  //       done(new Error('wrong'));
  //     })
  //     .catch((e) => {try {
  //       expect(e).toBeInstanceOf(NotFoundException); // Check the type of the error
  //       done(); // Call done when the test passes
  //     } catch (err) {
  //       done(err); // Call done with error if assertion fails
  //     }});
  // });
//   it('throws an error if the user with a given ID is not found', async () => {
//     //fakeUsersService.readOne = () => Promise.resolve(null);
// fakeUsersService.readOne = jest.fn().mockResolvedValue(null);
//     try {
//       await controller.getOneUser(1);
//       // Fail the test if no error is thrown
      
//       fail('Expected NotFoundException to be thrown');
//     } catch (e) {
//       expect(e).toBeInstanceOf(Error); // Check the type of the error
//     }
//   });
it('throws an error if the user with a given ID is not found', (done) => {
  // Mock readOne to return null
  // (fakeUsersService.readOne as jest.Mock).mockResolvedValue(null);
     fakeUsersService.readOne = () => Promise.resolve(null);

  controller
    .getOneUser(1)
    .then(() => {
      // Fail the test if no error is thrown
      done(new Error('Expected Error to be thrown'));
    })
    .catch((e) => {
      // Check if the error is an instance of Error and has the correct message
      try {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('User with ID 1 not found');
        done(); // Call done when the test passes
      } catch (err) {
        done(err); // Call done with error if assertion fails
      }
    });
});
});
