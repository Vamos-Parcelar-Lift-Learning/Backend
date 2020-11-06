import { Router } from 'express';
import helloRouter from './hello.routes';
import locatorRouter from './locator.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use(helloRouter);
routes.use('/locators', locatorRouter);
routes.use(userRouter);

export default routes;
