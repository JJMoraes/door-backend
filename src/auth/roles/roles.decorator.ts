import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/enum/user-role.enum';

export const Roles = (...role: Role[]) => SetMetadata('role', role);