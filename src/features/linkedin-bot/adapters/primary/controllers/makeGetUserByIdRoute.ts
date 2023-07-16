import { Request, Response } from 'express';
import {UserRepositoryPort} from "../../../domain/ports/user-repository.port";


export const processGetUserRoute = (userRepository: UserRepositoryPort) => {
    return async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const user = await userRepository.getUserById(userId);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };
};
