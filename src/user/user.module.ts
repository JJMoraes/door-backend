import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SecurityConstants } from '../auth/security-constants';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: SecurityConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, JwtStrategy],
  exports:[UserService, AuthService],
})
export class UserModule {};