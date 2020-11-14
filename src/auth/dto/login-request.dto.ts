import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO{

	@IsString()
	@IsNotEmpty()
	password: string;
	
	@IsString()
	@IsNotEmpty()
	email:string;
  
}