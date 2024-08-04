import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { hash ,compare} from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signUp(email: string, password: string) {
    const users = await this.userService.read(email);
    if (users.length > 0)
      throw new BadRequestException(
        'there is a user with this specified E-mail',
      );
    password = await hash(password, 12);
    const user = await this.userService.create(email, password);
    return user;
  }
  async signIn(email: string, password: string) {
      const user = await this.userService.read(email);
      if (!user[0])throw new BadRequestException( 'Incorrect User Or Password',);
  const check = await compare(password, user[0].password);
  if(!check)throw new BadRequestException('Incorrect User Or Password');
    return user
}
}
/*
We use create then save , findOne then update process then save 
we use find then remove Because this way we made a great thing 
we can make use of the hooks we defined inside the entity class
*/
