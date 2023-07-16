import { Request, Response } from 'express';
import {AddActionCommand} from "../../../domain/commands/add-action/add-action-command";
import {UserRepositoryPort} from "../../../domain/ports/user-repository.port";


export const processAddActionRoute = (userRepository: UserRepositoryPort) => {
    return async (req: Request, res: Response): Promise<void> => {
        try {
            const addActionCommand: AddActionCommand = new AddActionCommand(userRepository);
            const { userId, type, maxCredits } = req.body;

            await addActionCommand.execute(userId, type, maxCredits);

            res.status(200).json({ message: 'Action added successfully' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };
};
