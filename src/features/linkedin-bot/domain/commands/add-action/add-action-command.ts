import {UserRepositoryPort} from "../../ports/user-repository.port";


export class AddActionCommand {
    constructor(private userRepository: UserRepositoryPort) {
    }

    async execute(userId: string, type: string, maxCredits: number): Promise<void> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) throw new Error('User not found');
        user.queue.addActionToQueue(type, maxCredits);
        user.addActionToActions(type, maxCredits);
        await this.userRepository.update(user);
    }
}



