import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import User from './user.entity';
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    //create a fake coby of user service
   const users: User[] = [];
   fakeUsersService = {
     read: (email: string) => {
       const filteredUsers = users.filter((user) => user.email === email);
       return Promise.resolve(filteredUsers);
     },
     create: (email: string, password: string) => {
       const user = {
         id: Math.floor(Math.random() * 999999),
         email,
         password,
       } as User;
       users.push(user);
       return Promise.resolve(user);
     },
   };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance', async () => {
    expect(service).toBeDefined();
  });
  it('creates new user ', async () => {
    const user = await service.signUp('wowo@w.com', 'wpwpw');
    expect(user.password).not.toEqual('wpwpw');
    console.log(user);
  });

//   it('throws an err  ', async (done) => {
//     fakeUsersService.read = () =>
//       Promise.resolve([{ id: 1, email: 'ada', password: 'sd' } as User]);
//     try {
//       await service.signUp('woowo@w.com', 'wpwpw')
     
//     } catch (err) {

//         done()
//     }
//   }); 
it('throws an error', (done) => {
    
    service.signUp('woowoq@w.com', 'wpwpw').then(() => {
    service
    .signUp('woowoq@w.com', 'wpwpw')
    .then(() => {
      // If no error is thrown, fail the test
      done(new Error('Expected error was not thrown'));
    })
    .catch((err) => {
      // If an error is thrown, pass the test
      done();
    });
    });
});

it('throws an error during sign in if unused email', (done) => {
   service
    .signIn('wwwwoowo@w.com', 'wpwpw')
    .then(() => {
      // If no error is thrown, fail the test
      done(new Error('Expected error was not thrown'));
    })
    .catch((err) => {
      // If an error is thrown, pass the test
      done();
    });
    
});
it('throws an error during sign in if wrong password', (done) => {
  
    service.signUp('woowo@w.com', 'wpwpw').then((u) => {
    service
    .signIn('woowo@w.com', 'wpwpwAWRONG')
    .then(() => {
      // If no error is thrown, fail the test
      done(new Error('Expected error was not thrown'));
    })
    .catch((err) => {
      // If an error is thrown, pass the test
      done();
    });    
    });
  
    
});
it('returns A user if signed in', async() => {
    await service.signUp('a7a@gmail.com','123456789')
  const user =await service
    .signIn('a7a@gmail.com', '123456789')
    expect(user).toBeDefined()
    });
    



});
