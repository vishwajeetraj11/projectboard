import { Member } from '../../models/Member.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const isAdminInProject = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const isAdmin = await Member.findOne({
    user: req.user.userId,
    project: projectId,
    access: 'admin',
  });
  req.user.isAdmin = true;
  if (!isAdmin) {
    return next(
      new AppError('You need to be admin inorder to perform this action.', 403)
    );
  }
  next();
});
