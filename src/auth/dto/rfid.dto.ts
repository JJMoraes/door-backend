import { IsNotEmpty, IsString } from 'class-validator';

export class RfidDTO{

	@IsString()
	@IsNotEmpty()
	rfid:string;
}