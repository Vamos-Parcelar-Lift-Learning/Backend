import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/users', userController.get);
userRouter.put('/users', userController.put);

export default userRouter;
