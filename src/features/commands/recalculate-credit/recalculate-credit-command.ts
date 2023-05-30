import { UserRepository } from "../../repositories/user-repository";

export class RecalculateCreditsCommand {
    constructor(private userRepo: UserRepository) { }

    execute(userId: string): void {
        const user = this.userRepo.getUserById(userId);
        if (!user) throw new Error('User not found');
        user.recalculateCreditsIfNeeded();
        this.userRepo.update(user);
    }
}
