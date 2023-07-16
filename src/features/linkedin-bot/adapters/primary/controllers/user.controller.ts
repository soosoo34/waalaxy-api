import {Express} from 'express';
import {processAddActionRoute} from "./processAddActionRoute";
import {processGetUserRoute} from "./makeGetUserByIdRoute";
import {UserRepositoryPort} from "../../../domain/ports/user-repository.port";


export const setupRoutes = (app: Express, userRepository: UserRepositoryPort): void => {
    const addActionRoute = processAddActionRoute(userRepository);
    const getUserRoute = processGetUserRoute(userRepository);

    app.post('/api/actions', addActionRoute);
    app.get('/api/users/:userId', getUserRoute);


};
