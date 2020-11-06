import { Router } from 'express';
import UserController from '../controllers/UserController';
import LocatorController from '../controllers/LocatorController';

const adminRouter = Router();
const userController = new UserController();
const locatorController = new LocatorController();

adminRouter.get('/users', userController.get);
adminRouter.get('/locators', locatorController.index);

export default adminRouter;
