import { Router } from 'express';

import userRouter from './user.routes';
import adminRouter from './admin.routes';
import locatorRouter from './locator.routes';
import sessionsRouter from './sessions.routes';

import authMiddleware from '../middlewares/AuthMiddleware';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ message: 'Hello from VP!' });
});

routes.use(sessionsRouter);
routes.use('/admin', adminRouter);
routes.use(authMiddleware);

routes.use('/locators', locatorRouter);
routes.use(userRouter);

export default routes;
