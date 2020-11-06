import { Router } from 'express';
import LocatorController from '../controllers/LocatorController';

const locatorRouter = Router();
const locatorController = new LocatorController();

locatorRouter.get('/', locatorController.index);
locatorRouter.get('/:code', locatorController.getLocator);

export default locatorRouter;
