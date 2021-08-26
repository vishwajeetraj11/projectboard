import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getUsers,
} from '../controllers/userController.js';
import { checkJwt } from '../middlewares/authMiddleware.js';
import { authorizeMiddleware } from '../middlewares/authorizeMiddleware.js';

export const userRouter = Router();
userRouter.use(checkJwt);
userRouter.use(authorizeMiddleware);
userRouter.route('/').get(getUsers);
userRouter.route('/profile').get(getProfile).patch(updateProfile);
