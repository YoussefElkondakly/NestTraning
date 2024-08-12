import { PartialType } from '@nestjs/mapped-types';
import { CreateJoeReDto } from './create-joe-re.dto';

export class UpdateJoeReDto extends PartialType(CreateJoeReDto) {}
