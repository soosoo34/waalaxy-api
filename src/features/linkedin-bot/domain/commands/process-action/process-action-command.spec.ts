import {InMemoryUserRepository} from "../../../adapters/secondary/repositories/in-memory-user-repository";
import {AddActionCommand} from "../add-action/add-action-command";
import {User} from "../../entities/user/user-model";
import {ProcessActionCommand} from "./process-action-command";
import {ActionQueueBuilder} from "../../entities/action-queue/action-queue-model";
import {ActionBuilder} from "../../entities/action/action-model";

describe('process-action', () => {
    let userRepository: InMemoryUserRepository;
    let addActionCommand: AddActionCommand;
    let processActionCommand: ProcessActionCommand;
    let baseJohnDoe: User;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        addActionCommand = new AddActionCommand(userRepository);
        processActionCommand = new ProcessActionCommand(userRepository);
        baseJohnDoe = new User();
    });

    it('should be able to process action', async function () {
        // GIVEN John DOE HAS  ACTIONS TO PROCESS
        const queue = new ActionQueueBuilder()
            .withUserId('1')
            .withId('1')
            .withActions([
                new ActionBuilder().withType('Visite').withMaxCredits(10).withCredits(10).build(),
                new ActionBuilder().withType('Visite').withMaxCredits(15).withCredits(13).build(),
                new ActionBuilder().withType('Message').withMaxCredits(20).withCredits(20).build(),
                new ActionBuilder().withType('Message').withMaxCredits(20).withCredits(16).build(),
                new ActionBuilder().withType('Message').withMaxCredits(20).withCredits(16).build(),
                new ActionBuilder().withType('Message').withMaxCredits(20).withCredits(19).build(),
                new ActionBuilder().withType('Message').withMaxCredits(20).withCredits(18).build(),
                new ActionBuilder().withType('Visite').withMaxCredits(20).withCredits(16).build(),
                new ActionBuilder().withType('Email').withMaxCredits(20).withCredits(19).build(),
                new ActionBuilder().withType('Email').withMaxCredits(35).withCredits(31).build(),
                new ActionBuilder().withType('Email').withMaxCredits(47).withCredits(39.6).build(),
            ])
            .build();


        const johnDoe: User = new User({
            id: "1",
            queue: queue,
            actions: [
                new ActionBuilder().withType('Visite').withMaxCredits(10).withCredits(16).build(),
                new ActionBuilder().withType('Message').withMaxCredits(20).withCredits(19).build(),
                new ActionBuilder().withType('Email').withMaxCredits(20).withCredits(19).build(),
            ],
            lastCalculation: new Date()
        });
        userRepository.feed(johnDoe);

        // WHEN John Doe processes the action
        await processActionCommand.execute(johnDoe.id);
        // THEN the action should be processed
        expect(johnDoe.queue.actions.length).toBe(10);
        expect(johnDoe.queue.actions[0].type).toBe('Visite');
        // AND ANOTHER ACTION HAS PROCESSED
        await processActionCommand.execute(johnDoe.id);
        expect(johnDoe.queue.actions.length).toBe(9);
        expect(johnDoe.queue.actions[0].type).toBe('Message');
    });

    it('ne devrait pas être en mesure de traiter en raison d\'aucun crédit', async function () {
        // GIVEN John DOE HAS ACTIONS TO PROCESS

        const queue = new ActionQueueBuilder()
            .withUserId('1')
            .withId('1')
            .withActions([
                new ActionBuilder().withType('Visite').withMaxCredits(10).withCredits(18).build()
            ]).build();

        const johnDoe: User = new User({
            id: "1",
            queue: queue,
            actions: [
                new ActionBuilder().withType('Visite').withMaxCredits(10).withCredits(0).build(),
            ],
            lastCalculation: new Date()
        });
        userRepository.feed(johnDoe);


        // WHEN John Doe processes the action
        await expect(processActionCommand.execute(johnDoe.id))
            // THEN the action should be processed
            .rejects.toThrowError('Action credit is 0');
    });


});

