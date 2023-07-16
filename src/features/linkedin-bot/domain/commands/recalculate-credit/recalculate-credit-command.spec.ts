import {InMemoryUserRepository} from "../../../adapters/secondary/repositories/in-memory-user-repository";
import {User} from "../../entities/user/user-model";
import {RecalculateCreditsCommand} from "./recalculate-credit-command";

describe('RecalculateCreditsCommand', () => {
    let userRepository: InMemoryUserRepository;
    let recalculateCreditsCommand: RecalculateCreditsCommand;
    let johnDoe: User;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        recalculateCreditsCommand = new RecalculateCreditsCommand(userRepository);
        johnDoe = new User();
    });


    // TODO refactor this test to use builder pattern
    it('should recalculate credits if last calculation was over 24 hours ago', async () => {
        // GIVEN John Doe HAD HIS LAST CALCULATION OVER 24 HOURS AGO
        johnDoe.lastCalculation = new Date(new Date().getTime() - (24 * 60 * 60 * 1000 + 1));
        johnDoe.addActionToActions('action1', 10);
        userRepository.feed(johnDoe);

        // WHEN John Doe recalculates credits
        await recalculateCreditsCommand.execute(johnDoe.id);

        // THEN the credits should be recalculated
        const user = await userRepository.getUserById(johnDoe.id);
        expect(user?.actions[0].credits).toBeLessThan(11);
    });

    it('should not recalculate credits if last calculation was less than 24 hours ago', async () => {
        // GIVEN John Doe HAD HIS LAST CALCULATION LESS THAN 24 HOURS AGO
        johnDoe.lastCalculation = new Date(new Date().getTime() - (23 * 60 * 60 * 1000));
        johnDoe.addActionToActions('action1', 10);
        userRepository.feed(johnDoe);

        const initialCredits = johnDoe.actions[0].credits;

        // WHEN John Doe recalculates credits
        await recalculateCreditsCommand.execute(johnDoe.id);

        // THEN the credits should not change
        const user = await userRepository.getUserById(johnDoe.id);
        expect(user?.actions[0].credits).toEqual(initialCredits);
    });
});
