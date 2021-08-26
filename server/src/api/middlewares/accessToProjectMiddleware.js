import { Member } from '../../models/Member.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const accessToProjectMiddleware = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const isMember = await Member.findOne({
    user: req.user.userId,
    project: projectId,
  });
  if (!isMember) {
    return next(
      new AppError('You do not have the access to this project.', 403)
    );
  }
  req.user.memberId = isMember._id;
  next();
});
