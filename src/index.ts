import express, {Express} from 'express';
import {setupRoutes} from "./features/linkedin-bot/adapters/primary/controllers/user.controller";
import cors from 'cors';
import {DemoInMemoryUserRepository} from "./features/linkedin-bot/adapters/secondary/repositories/demo-in-memory-user-repository";
import {setupCron} from "./features/linkedin-bot/adapters/primary/controllers/user.cron";

const app: Express = express();
const userRepository: DemoInMemoryUserRepository = new DemoInMemoryUserRepository();

app.use(express.json());
app.use(cors());

setupRoutes(app, userRepository);
setupCron(userRepository);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

