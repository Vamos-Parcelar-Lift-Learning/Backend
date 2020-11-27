import { Router } from 'express';
import UserController from '../controllers/UserController';
import LocatorController from '../controllers/LocatorController';
import AdminTransactionController from '../controllers/AdminTransactionController';

const adminRouter = Router();
const userController = new UserController();
const locatorController = new LocatorController();
const adminTransactionController = new AdminTransactionController();

adminRouter.get('/users', userController.index);
adminRouter.get('/locators', locatorController.index);
adminRouter.get('/transactions', adminTransactionController.index);

export default adminRouter;
