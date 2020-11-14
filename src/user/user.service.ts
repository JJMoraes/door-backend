import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AlterUserDTO } from './dto/alter-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Role } from './enum/user-role.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  listAllUsersAdmin(): Promise<User[]> {
    return this.userRepository.findAllByRole(Role.ADMIN);
  }

  listAllUsersRequests(): Promise<User[]> {
    return this.userRepository.findAllByRole(Role.ASPIRANT);
  }

  listAllUsersMembers(): Promise<User[]> {
    return this.userRepository.findAllByRole(Role.MEMBER);
  }

  getUserById(id:number): Promise<User>{
    return this.userRepository.findById(id);
  }

  createUser(user: User): void {
    this.userRepository.persist(user);
  }

  async hashPassword(password: string): Promise<string> {
    var crypto = require('crypto');
    return await crypto.createHash('md5').update(password).digest("hex");
	}

  async alterUser(id:number, alterUserDTO: AlterUserDTO): Promise<void> {
    const user = await this.userRepository.findById(id);
		user.email = alterUserDTO.email;
    user.username = alterUserDTO.name;
    user.password = await this.hashPassword(alterUserDTO.password);
		user.rfid = alterUserDTO.rfid;
    
    this.userRepository.persist(user);
  }

  async updateRole(id:number, role:Role): Promise<void>{
    const user = await this.userRepository.findById(id);
    user.role = role;
    if(role == Role.ASPIRANT)
      user.isActive = false;
    this.userRepository.persist(user);
  }

  async remove(id:number): Promise<void>{
    const user = await this.userRepository.findOne({id});
    this.userRepository.removeUser(user);
  }

  async changeActivity(id:number, activity:boolean):Promise<void>{
    const user = await this.userRepository.findById(id);
    user.isActive = activity;
    this.userRepository.persist(user);
  }
  
  async findByEmail(email:string): Promise<User>{
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async findByRfid(rfid:string): Promise<boolean>{
    const user = await this.userRepository.findByRfid(rfid);
    return (user.isActive && user.role != Role.ASPIRANT);
  }
  

}