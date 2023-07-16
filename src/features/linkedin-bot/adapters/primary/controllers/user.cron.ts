import {ProcessActionCommand} from "../../../domain/commands/process-action/process-action-command";
import {RecalculateCreditsCommand} from "../../../domain/commands/recalculate-credit/recalculate-credit-command";
import {UserRepositoryPort} from "../../../domain/ports/user-repository.port";
import {User} from "../../../domain/entities/user/user-model";

const cron = require('node-cron');


export const setupCron = (userRepository: UserRepositoryPort): void => {
    cron.schedule('*/2 * * * *', async () => {
        const processActionCommand: ProcessActionCommand = new ProcessActionCommand(userRepository);
        const recalculatesCreditCommand: RecalculateCreditsCommand = new RecalculateCreditsCommand(userRepository);
        const users: User[] = await userRepository.getAllUsers();
        for (const user of users) {
            try {
                await processActionCommand.execute(user.id);
            } catch (e) {
                console.log(e);
            }
            try {
                await recalculatesCreditCommand.execute(user.id);
            } catch (e) {
                console.log(e);
            }
        }
    });
}
