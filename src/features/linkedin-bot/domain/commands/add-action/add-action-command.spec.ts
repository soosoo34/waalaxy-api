
import {AddActionCommand} from "./add-action-command";
import {User} from "../../entities/user/user-model";
import {InMemoryUserRepository} from "../../../adapters/secondary/repositories/in-memory-user-repository";

describe('actions-queue', () => {
    let userRepository: InMemoryUserRepository;
    let addActionCommand: AddActionCommand;
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        addActionCommand = new AddActionCommand(userRepository);
    });

    it('should be able to add Action to the queue for John Doe user', async function () {
        // GIVEN John Doe ADDS AN ACTION TO THE QUEUE
        const johnDoe = new User();
        userRepository.feed(johnDoe);
        // WHEN John Doe adds an action to the queue
        addActionCommand.execute(johnDoe.id, 'visite', 100);
        // THEN the action should be added to the queue
        const user = await userRepository.getUserById(johnDoe.id);
        expect(user?.queue.actions[0].type).toEqual('visite');

    });

    it('should be able to add action to actions list', async function () {
        // GIVEN John Doe ADDS TWO ACTIONS VISITE TO THE QUEUE
        const johnDoe = new User();
        userRepository.feed(johnDoe);

        // WHEN John Doe adds an action to the queue
        await addActionCommand.execute(johnDoe.id, 'visite', 100);
        await addActionCommand.execute(johnDoe.id, 'visite', 50);

        // THEN the action should be added to the queue
        const user = await userRepository.getUserById(johnDoe.id);
        expect(user?.actions[0].type).toEqual('visite');
        expect(user?.actions.length).toEqual(1);
        expect(user?.queue.actions.length).toEqual(2);
    });


});
