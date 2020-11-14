import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
	constructor(
    private userService: UserService,
		private jwtService: JwtService
	) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const hashpass = await this.hashPassword(pass);
    if (user && user.password === hashpass) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException("Login or Password are wrong");    
  }

	async hashPassword(password: string): Promise<string> {
    var crypto = require('crypto');
    return await crypto.createHash('md5').update(password).digest("hex");
	}
  
  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    const user = User.create();
		user.username = createUserDTO.name;
		user.password = await this.hashPassword(createUserDTO.password);
		user.email = createUserDTO.email;
    user.rfid = createUserDTO.rfid;
    
    this.userService.createUser(user);
  }

	async login(loginDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.validateUser(loginDTO.email, loginDTO.password);
    const payload = { username: user.username,  id:user.id, role:user.role};
    const loginResponseDTO = new LoginResponseDTO();
    loginResponseDTO.accessToken = this.jwtService.sign(payload);
    return loginResponseDTO;
  }

  checkRFID(rfid:string): void{
    if(!this.userService.findByRfid(rfid)){
      throw new UnauthorizedException();
    }
  }
} 