import { catchAsync } from '../../utils/catchAsync.js';
// import { AppError } from '../../utils/AppError.js';
import { User } from '../../models/User.js';
import { History } from '../../models/History.js';

export const getProjectHistory = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const history = await History.find({
    project: projectId,
  }).sort({ createdAt: -1 });
  await User.populate(history, {
    path: 'user extraDetails.user',
  });
  return res.status(200).json({ status: 'success', history });
});

export const getTaskHistory = catchAsync(async (req, res, next) => {
  const { projectId, taskId } = req.params;
  const history = await History.find({
    project: projectId,
    task: taskId,
  }).sort({ createdAt: -1 });
  await User.populate(history, {
    path: 'user extraDetails.user',
  });
  return res.status(200).json({ status: 'success', history });
});
