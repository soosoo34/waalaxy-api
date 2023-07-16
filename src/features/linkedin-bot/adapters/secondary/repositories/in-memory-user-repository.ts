import {User} from "../../../domain/entities/user/user-model";
import {UserRepositoryPort} from "../../../domain/ports/user-repository.port";


export class InMemoryUserRepository implements UserRepositoryPort{
     users: User[] = [];

    async getUserById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

     feed(user: User): void {
        this.users.push(user);
    }

    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }

}
