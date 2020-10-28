import { Router } from 'express';
import helloRouter from './hello.routes';
import locatorRouter from './locator.routes';

const routes = Router();

routes.use(helloRouter);
routes.use('/locator', locatorRouter);

export default routes;
