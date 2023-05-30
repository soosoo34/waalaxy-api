import {UserRepository} from "./features/repositories/user-repository";
import {User} from "./features/entities/user/user-model";
import {ProcessActionCommand} from "./features/commands/process-action/process-action-command";
import {AddActionCommand} from "./features/commands/add-action/add-action-command";
import {RecalculateCreditsCommand} from "./features/commands/recalculate-credit/recalculate-credit-command";
const cron = require('node-cron');

const userRepository = new UserRepository();
const johnDoee = new User();
userRepository.feed(johnDoee);
const users = userRepository.getUserById(johnDoee.id);
const addAction: AddActionCommand = new AddActionCommand(userRepository);
const processAction: ProcessActionCommand = new ProcessActionCommand(userRepository);
const recalculateCreditsCommand: RecalculateCreditsCommand = new RecalculateCreditsCommand(userRepository);

addAction.execute(johnDoee.id, 'visite' , 100);
addAction.execute(johnDoee.id, 'visite' , 100);
addAction.execute(johnDoee.id, 'Friend request' , 50);
addAction.execute(johnDoee.id, 'Friend request' , 50);
addAction.execute(johnDoee.id, 'Friend request' , 50);
addAction.execute(johnDoee.id, 'Friend request' , 50);
addAction.execute(johnDoee.id, 'Friend request' , 50);
addAction.execute(johnDoee.id, 'Send mail' , 20);
addAction.execute(johnDoee.id, 'Send mail' , 20);
addAction.execute(johnDoee.id, 'visite' , 100);
addAction.execute(johnDoee.id, 'visite' , 100);

function startCronJobs(user: User) {
    console.log('start cron jobs')
    cron.schedule('*/2 * * * *', () => {
        processAction.execute(user.id, user.queue.actions[0]);
        recalculateCreditsCommand.execute(user.id);
        console.log(user.queue.actions.length);
        // for each action in the queue, console log the type
        user.queue.actions.forEach(action => {
            console.log(action.type);
        });
    });
}

startCronJobs(johnDoee);


