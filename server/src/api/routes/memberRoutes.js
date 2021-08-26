import { Router } from 'express';
import {
  addMemberToProject,
  getAllMembersOfProject,
  deleteAmemberFromProject,
} from '../controllers/memberController.js';

import { checkJwt } from '../middlewares/authMiddleware.js';
import { authorizeMiddleware } from '../middlewares/authorizeMiddleware.js';
import { isAdminInProject } from '../middlewares/isAdminInProjectMiddleware.js';

export const memberRouter = Router({ mergeParams: true });
memberRouter.use(checkJwt);
memberRouter.use(authorizeMiddleware);
memberRouter.route('/').get(getAllMembersOfProject);
memberRouter.use(isAdminInProject);
memberRouter
  .route('/:id')
  .delete(deleteAmemberFromProject)
  .post(addMemberToProject);
