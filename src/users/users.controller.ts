import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import CreateUserDto from 'src/dtos/create-user.dto';
import UpdateUserDto from 'src/dtos/update-user.dto';
import  {
  serializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import UserDto from 'src/dtos/user.dto';
import { AuthService } from './auth.service';
import SignInUserDto from 'src/dtos/signin-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import User from './user.entity';
import AuthGuard from 'src/guards/auth.guard';
import { HttpExceptionFilter } from 'src/filters/custom-exception.filter';

@serializeInterceptor(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  // @Get('/colors/:cl')
  // setCl(@Param('cl') color: string, @Session() session: any) {
  //   session.color = color;
  // }
  @Get('/wow')
  @UseGuards(AuthGuard)
  getColor(@CurrentUser() user: User) {
    return user;
  }
  @Get('/signout')
  signOut(@Session() session: any) {
    return (session.user = null);
  }
  @Post('/signup')
  // @UseFilters(new HttpExceptionFilter())
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signUp(email, password);
    session.user = user.id;
    return user;
  }
  @Post('/signin')
  async logUserIn(@Body() body: SignInUserDto, @Session() session: any) {
    const { email, password } = body;
    const [user] = await this.authService.signIn(email, password);
    session.user = user.id;
    return user;
  }
  @Get()
  getUsers(@Query('email') email: string) {
    return this.usersService.read(email);
  }
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    //the second one after the context in the interceptor
    return this.usersService.readOne(id);
  }
  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() bod: UpdateUserDto,
  ) {
    return this.usersService.update(id, bod);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
