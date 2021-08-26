import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatusInBoard,
  // updateTaskStatus,
} from '../controllers/tasksController.js';
import { checkJwt } from '../middlewares/authMiddleware.js';
import { authorizeMiddleware } from '../middlewares/authorizeMiddleware.js';
import { accessToProjectMiddleware } from '../middlewares/accessToProjectMiddleware.js';

export const taskRouter = Router({ mergeParams: true });
taskRouter.use(checkJwt);
taskRouter.use(authorizeMiddleware);
taskRouter.use(accessToProjectMiddleware);
taskRouter.route('/').get(getAllTasks).post(createTask);
taskRouter.route('/:id/update').patch(updateTaskStatusInBoard);
// taskRouter.route('/:id/update-status').patch(updateTaskStatus);
taskRouter.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);
