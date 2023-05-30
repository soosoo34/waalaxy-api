import {UserRepository} from "../../repositories/user-repository";
import {AddActionCommand} from "../add-action/add-action-command";
import {User} from "../../entities/user/user-model";
import {ProcessActionCommand} from "./process-action-command";

describe('process-action', () => {
    let userRepository: UserRepository;
    let addActionCommand: AddActionCommand;
    beforeEach(() => {

    });

    it('should be able to process action', function () {
        const johnDoe: User = new User();
        userRepository = new UserRepository();
        addActionCommand = new AddActionCommand(userRepository);
        userRepository.feed(johnDoe);
        addActionCommand.execute(johnDoe.id, 'Visite', 10);
        addActionCommand.execute(johnDoe.id, 'Visite', 15);
        addActionCommand.execute(johnDoe.id, 'Message', 20);
        addActionCommand.execute(johnDoe.id, 'Message', 20);
        addActionCommand.execute(johnDoe.id, 'Message', 20);
        addActionCommand.execute(johnDoe.id, 'Message', 20);
        addActionCommand.execute(johnDoe.id, 'Message', 20);
        addActionCommand.execute(johnDoe.id, 'Visite', 20);
        addActionCommand.execute(johnDoe.id, 'Email', 20);
        addActionCommand.execute(johnDoe.id, 'Email', 35);
        addActionCommand.execute(johnDoe.id, 'Email', 47);
        // GIVEN John DOE HAS  ACTIONS TO PROCESS
        let processActionCommand: ProcessActionCommand;
        processActionCommand = new ProcessActionCommand(userRepository);
        expect(johnDoe.queue.actions.length).toBe(11);
        // WHEN John Doe processes the action
        processActionCommand.execute(johnDoe.id, johnDoe.queue.actions[0]);
        // THEN the action should be processed
        expect(johnDoe.queue.actions.length).toBe(10);
        expect(johnDoe.queue.actions[0].type).toBe('Visite');
        // AND ANOTHER ACTION HAS PROCESSED
        processActionCommand.execute(johnDoe.id, johnDoe.queue.actions[0]);
        expect(johnDoe.queue.actions.length).toBe(9);
        expect(johnDoe.queue.actions[0].type).toBe('Message');
    });

    it('ne devrait pas être en mesure de traiter en raison d\'aucun crédit', function () {
        const johnDoe: User = new User();
        userRepository = new UserRepository();
        addActionCommand = new AddActionCommand(userRepository);
        userRepository.feed(johnDoe);
        // GIVEN John DOE HAS ACTIONS TO PROCESS
        addActionCommand.execute(johnDoe.id, 'Visite', 0);
        // WHEN John Doe processes the action
        let processActionCommand: ProcessActionCommand;
        processActionCommand = new ProcessActionCommand(userRepository);
        try {
            processActionCommand.execute(johnDoe.id, johnDoe.queue.actions[0]);
            fail('L\'action aurait dû échouer en raison d\'un manque de crédits');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Action credit is 0');
            } else {
                fail('Une erreur inattendue a été levée');
            }
        }
        // THEN the action should be processed
        expect(johnDoe.queue.actions.length).toBe(1);
        expect(johnDoe.queue.actions[0].type).toBe('Visite');
    });



});

