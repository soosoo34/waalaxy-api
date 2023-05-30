import {UserRepository} from "../../repositories/user-repository";
import {AddActionCommand} from "./add-action-command";
import {User} from "../../entities/user/user-model";

describe('actions-queue', () => {
    let userRepository: UserRepository;
    let addActionCommand: AddActionCommand;
    beforeEach(() => {
        userRepository = new UserRepository();
        addActionCommand = new AddActionCommand(userRepository);
    });

    it('should be able to add Action to the queue for John Doe user', function () {
        // GIVEN John Doe ADDS AN ACTION TO THE QUEUE
        const johnDoe = new User();
        userRepository.feed(johnDoe);
        // WHEN John Doe adds an action to the queue
        addActionCommand.execute(johnDoe.id, 'visite' , 100);
        // THEN the action should be added to the queue
        expect(userRepository.getUserById(johnDoe.id)?.queue.actions[0].type).toEqual('visite');

    });

    it('should be able to add action to actions list', function () {
        // GIVEN John Doe ADDS TWO ACTIONS VISITE TO THE QUEUE
        const johnDoe = new User();
        userRepository.feed(johnDoe);

        // WHEN John Doe adds an action to the queue
        addActionCommand.execute(johnDoe.id, 'visite' , 100);
        addActionCommand.execute(johnDoe.id, 'visite' , 50);

        // THEN the action should be added to the queue
        expect(userRepository.getUserById(johnDoe.id)?.actions[0].type).toEqual('visite');
        expect(userRepository.getUserById(johnDoe.id)?.actions.length).toEqual(1);
        expect(userRepository.getUserById(johnDoe.id)?.queue.actions.length).toEqual(2);
    });


});
