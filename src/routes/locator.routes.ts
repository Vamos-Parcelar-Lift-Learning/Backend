import { Router } from 'express';
import LocatorController from '../controllers/LocatorController';

const locatorRouter = Router();
const locatorController = new LocatorController();

locatorRouter.get('/', locatorController.get);

export default locatorRouter;
