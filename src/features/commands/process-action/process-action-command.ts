import {UserRepository} from "../../repositories/user-repository";
import {Action} from "../../entities/action/action-model";

export class ProcessActionCommand {
    constructor(private user: UserRepository) {
    }

    execute(userId: string , action: Action): void {
        const user = this.user.getUserById(userId);
        if (!user) throw new Error('User not found');
        user.getCredit(action);
        user.queue.processAction();
    }
}
