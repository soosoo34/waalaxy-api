import {User} from "../../../domain/entities/user/user-model";
import {UserRepositoryPort} from "../../../domain/ports/user-repository.port";


export class DemoInMemoryUserRepository implements UserRepositoryPort{
     users: User[] = [
         new User(),
     ];

     constructor() {
         this.users[0].id = '1';
     }

    async getUserById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }



    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }

}
