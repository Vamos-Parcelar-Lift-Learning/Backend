import { Router } from 'express';
import CallbackTransactionController from '../controllers/CallbackTransactionController';

const callbackRouter = Router();
const callbackController = new CallbackTransactionController();

callbackRouter.post('/', callbackController.patch);

export default callbackRouter;
