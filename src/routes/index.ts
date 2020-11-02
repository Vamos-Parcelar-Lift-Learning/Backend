import { Router } from 'express';
import helloRouter from './hello.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use(helloRouter);
routes.use(userRouter);

export default routes;
