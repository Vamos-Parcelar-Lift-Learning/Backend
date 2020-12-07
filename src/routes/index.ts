import { Router } from 'express';

import userRouter from './user.routes';
import adminRouter from './admin.routes';
import locatorRouter from './locator.routes';
import callbackRouter from './callback.routes';
import sessionsRouter from './sessions.routes';
import transactionRouter from './transaction.routes';

import authMiddleware from '../middlewares/AuthMiddleware';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ message: 'Hello from VP!' });
});

routes.use(sessionsRouter);
routes.use('/admin', adminRouter);
routes.use('/locators', locatorRouter);

routes.use('/callback', callbackRouter);
routes.use(authMiddleware);
routes.use('/transactions', transactionRouter);
routes.use('/users', userRouter);

export default routes;
