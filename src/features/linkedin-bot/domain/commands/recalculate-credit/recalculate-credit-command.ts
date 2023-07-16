import {UserRepositoryPort} from "../../ports/user-repository.port";

export class RecalculateCreditsCommand {
    constructor(private userRepo: UserRepositoryPort) {
    }

    async execute(userId: string): Promise<void> {
        const user = await this.userRepo.getUserById(userId);
        if (!user) throw new Error('User not found');
        user.recalculateCreditsIfNeeded();
        await this.userRepo.update(user);
    }
}
