import {UserRepositoryPort} from "../../ports/user-repository.port";

export class ProcessActionCommand {
    constructor(private user: UserRepositoryPort) {
    }

    async execute(userId: string): Promise<void> {
        const user = await this.user.getUserById(userId);
        if (!user) throw new Error('User not found');
        if(user.actions.length === 0) return;
        user.payAction(user.actions[0]);
        user.queue.processAction();
    }
}
