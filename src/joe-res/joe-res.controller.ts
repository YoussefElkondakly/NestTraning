import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JoeResService } from './joe-res.service';
import { CreateJoeReDto } from './dto/create-joe-re.dto';
import { UpdateJoeReDto } from './dto/update-joe-re.dto';

@Controller('joe-res')
export class JoeResController {
  constructor(private readonly joeResService: JoeResService) {}

  @Post()
  create(@Body() createJoeReDto: CreateJoeReDto) {
    return this.joeResService.create(createJoeReDto);
  }

  @Get()
  findAll() {
    return this.joeResService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.joeResService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJoeReDto: UpdateJoeReDto) {
    return this.joeResService.update(+id, updateJoeReDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.joeResService.remove(+id);
  }
}
