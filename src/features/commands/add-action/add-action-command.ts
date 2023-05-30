import {UserRepository} from "../../repositories/user-repository";


export class AddActionCommand {
    constructor(private user: UserRepository) {
    }

    execute(userId: string, type: string, maxCredits: number): void {
        const user = this.user.getUserById(userId);
        if (!user) throw new Error('User not found');
        user.queue.addActionToQueue(type, maxCredits);
        user.addActionToActions(type, maxCredits);
        this.user.update(user);
    }

    }



