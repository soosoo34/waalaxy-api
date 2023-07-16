import {User} from "../entities/user/user-model";

export interface UserRepositoryPort {
    getUserById(id: string): Promise<User | undefined>;
    update(user: User): Promise<void>;
    getAllUsers(): Promise<User[]>;
}

