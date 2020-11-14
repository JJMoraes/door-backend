import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

import { ConflictException, NotFoundException} from '@nestjs/common';
import { Role } from './enum/user-role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
	async persist(user: User): Promise<void> {
		try {
			await user.save();
		} catch (e) {
			throw new ConflictException(e);
		}
	}

	async findById(id:number): Promise<User>{
		const user = await this.findOne({id});
		return user;
	}

	async findByEmail(email:string): Promise<User>{
		const user = await this.findOne({email});
		return user;
	}

  	async findAllUsers(): Promise<User[]> {
    	const users = await this.find();
    	return users;
	}
	
	async findAllByRole(role:Role): Promise<User[]> {
		const users = await this.find({role});
		return users;
	}

	async removeUser(user:User): Promise<void>{
		try {
			user.remove();	
		} catch (error) {
			throw new Error("Impossible to remove");
		}
	}
	
	async findByRfid(rfid:string): Promise<User>{
		const user = await this.findOne({rfid});
		return user;
	}
}