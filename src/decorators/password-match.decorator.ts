import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export const PasswordMatch = function (
  pass: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'PasswordMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [pass],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          console.log(args);
          const relatedValue = (args.object as Object)[pass]; //gets the value of the password from the target object its like UserDto['password]
          return relatedValue === value;
        },
      },
    });
  };
};