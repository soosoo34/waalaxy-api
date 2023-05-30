import {User} from "../entities/user/user-model";


export class UserRepository {
    private users: User[] = [];

    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    feed(user: User): void {
        this.users.push(user);
    }

    update(user: User): void {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = user;
    }

}
