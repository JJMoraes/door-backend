import { IsNotEmpty, IsString } from 'class-validator';

export class AlterUserDTO {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password: string;  

    @IsString()
    @IsNotEmpty()
    rfid:string;
  }