import { UserRepository } from "../../repositories/user-repository";
import { User } from "../../entities/user/user-model";
import {RecalculateCreditsCommand} from "./recalculate-credit-command";

describe('RecalculateCreditsCommand', () => {
    let userRepository: UserRepository;
    let recalculateCreditsCommand: RecalculateCreditsCommand;

    beforeEach(() => {
        userRepository = new UserRepository();
        recalculateCreditsCommand = new RecalculateCreditsCommand(userRepository);
    });

    it('should recalculate credits if last calculation was over 24 hours ago', () => {
        // GIVEN John Doe HAD HIS LAST CALCULATION OVER 24 HOURS AGO
        const johnDoe = new User();
        johnDoe.lastCalculation = new Date(new Date().getTime() - (24 * 60 * 60 * 1000 + 1)); // set lastCalculation to be over 24 hours ago
        johnDoe.addActionToActions('action1', 10);
        userRepository.feed(johnDoe);

        // WHEN John Doe recalculates credits
        recalculateCreditsCommand.execute(johnDoe.id);

        // THEN the credits should be recalculated
        expect(userRepository.getUserById(johnDoe.id)?.actions[0].credits).toBeLessThan(10); // assuming recalculation decreases credits
    });

    it('should not recalculate credits if last calculation was less than 24 hours ago', () => {
        // GIVEN John Doe HAD HIS LAST CALCULATION LESS THAN 24 HOURS AGO
        const johnDoe = new User();
        johnDoe.lastCalculation = new Date(new Date().getTime() - (23 * 60 * 60 * 1000)); // set lastCalculation to be less than 24 hours ago
        johnDoe.addActionToActions('action1', 10);
        userRepository.feed(johnDoe);

        const initialCredits = johnDoe.actions[0].credits;

        // WHEN John Doe recalculates credits
        recalculateCreditsCommand.execute(johnDoe.id);

        // THEN the credits should not change
        expect(userRepository.getUserById(johnDoe.id)?.actions[0].credits).toEqual(initialCredits);
    });
});
