import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo:Repository<User> ){}
create(email:string,password:string){
    const user = this.repo.create({email,password});
    return this.repo.save(user);
}
read(email:string){
    return this.repo.find({
      where: {
        email: email,
      },
    });
}
async readOne(id:number){ 
    if(!id)throw new NotFoundException("nouser")
   const user=await this.repo.findOneBy({ id });
    if(!user) throw new NotFoundException("nouser")
    return user;

    }
async update(id:number,attribs:Partial<User>){
    const user=await this.readOne(id)
    if(!user){throw new NotFoundException("No user with this specified Id")}
    Object.assign(user,attribs)
    return this.repo.save(user);

}
async delete(id:number){
    const user=await this.readOne(id)
    if(!user){throw new NotFoundException("No user with this specified Id")}
    return this.repo.remove(user);
}
}
/*
We use create then save , findOne then update process then save 
we use find then remove Because this way we made a great thing 
we can make use of the hooks we defined inside the entity class
*/