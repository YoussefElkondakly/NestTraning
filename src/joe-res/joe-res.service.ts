import { Injectable } from '@nestjs/common';
import { CreateJoeReDto } from './dto/create-joe-re.dto';
import { UpdateJoeReDto } from './dto/update-joe-re.dto';

@Injectable()
export class JoeResService {
  create(createJoeReDto: CreateJoeReDto) {
    return 'This action adds a new joeRe';
  }

  findAll() {
    return `This action returns all joeRes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} joeRe`;
  }

  update(id: number, updateJoeReDto: UpdateJoeReDto) {
    return `This action updates a #${id} joeRe`;
  }

  remove(id: number) {
    return `This action removes a #${id} joeRe`;
  }
}
