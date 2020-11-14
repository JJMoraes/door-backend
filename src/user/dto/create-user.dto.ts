import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  email:string;

  @IsString()
  @IsNotEmpty()
  rfid:string;

}