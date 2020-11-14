import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { Post, Body, Controller, Get, HttpCode } from "@nestjs/common";
import { LoginRequestDTO } from "./dto/login-request.dto";
import { LoginResponseDTO } from "./dto/login-response.dto";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { RfidDTO } from "./dto/rfid.dto";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly userService: UserService,
        private authService: AuthService
    ){}
    
    @Post()
    createUser(@Body() createUserDTO:CreateUserDTO): void {
      this.authService.createUser(createUserDTO);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDTO:LoginRequestDTO): Promise<LoginResponseDTO> {
      return this.authService.login(loginDTO);
    }

    @Get()
    checkRFID(@Body() rfidDTO:RfidDTO): void{
      this.authService.checkRFID(rfidDTO.rfid);
    }

}