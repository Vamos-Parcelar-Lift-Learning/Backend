import { Router } from 'express';
import HelloController from '../controllers/HelloController';

const helloRouter = Router();
const helloController = new HelloController();

helloRouter.get('/', helloController.get);

export default helloRouter;
