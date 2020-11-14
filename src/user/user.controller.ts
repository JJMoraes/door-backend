import { Controller, Get, Post, Put, Patch, Param, Body, UseInterceptors, ClassSerializerInterceptor, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AlterUserDTO } from './dto/alter-user.dto';
import { User } from './user.entity';
import { Role } from './enum/user-role.enum';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guards';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { OwnerGuard } from 'src/auth/owner/owner.guard';
import { UpdateRoleDTO } from './dto/update-role.dto';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {} 

  @Roles(Role.ADMIN)
  @Get('admin')
  listAllUsers(): Promise<User[]>{
    return this.userService.listAllUsersAdmin();
  }

  @Roles(Role.ADMIN)
  @Get('requests')
  listAllUsersRequests(): Promise<User[]>{
    return this.userService.listAllUsersRequests();
  }

  @Roles(Role.ADMIN)
  @Get('members')
  listAllUsersMembers(): Promise<User[]>{
    return this.userService.listAllUsersMembers();
  }

  @UseGuards(OwnerGuard)
  @Get(':id')
  getUserById(@Param('id') id:number): Promise<User>{
    return this.userService.getUserById(id);
  }

  @UseGuards(OwnerGuard)
  @Put(':id')
  alterUser(@Param('id') id:number, @Body() alterUserDTO: AlterUserDTO): void {
    this.userService.alterUser(id, alterUserDTO);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  approveUser(@Param('id') id): void{
    this.userService.updateRole(id, Role.MEMBER);
    this.userService.changeActivity(id, true);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  declineUser(@Param('id') id): void {
    this.userService.remove(id);
  }

  @Roles(Role.ADMIN)
  @Patch('activate/:id')
  activeUser(@Param('id') id): void{
    this.userService.changeActivity(id, true);
  }

  @Roles(Role.ADMIN)
  @Patch('deactivate/:id')
  deactivateUser(@Param('id') id): void{
    this.userService.changeActivity(id, false);
  }

  @Roles(Role.ADMIN)
  @Patch('roles/:id')
  updateRole(@Param('id') id, @Body() updateRoleDTO: UpdateRoleDTO): void {
    this.userService.updateRole(id, updateRoleDTO.role);
  }
}