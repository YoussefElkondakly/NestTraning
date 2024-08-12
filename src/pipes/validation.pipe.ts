import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value)
    console.log('------------------------------------------------\n',metadata)
    // console.dir('------------------------------------------------\n'+metadata.metatype)
    return value;
  }
}
