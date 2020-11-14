import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './enum/user-role.enum';

@Entity('user')
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 150})
  username: string;

  @Column({unique:true})
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({unique:true})
  rfid: string

  @Column({default: Role.ASPIRANT})
  role: Role;
  
  @Column({ default: false })
  isActive: boolean;
}
