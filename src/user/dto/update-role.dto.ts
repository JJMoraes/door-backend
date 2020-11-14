import { Role } from "../enum/user-role.enum";
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDTO{

    @IsNotEmpty()
    role:Role

}