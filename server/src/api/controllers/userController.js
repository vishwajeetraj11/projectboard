import { User } from '../../models/User.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.userId).select(
    '-transaction -client_id -tenant -request_language'
  );

  if (!user) {
    return next(new AppError('No user found.', 404));
  }
  res.status(200).json({
    status: 'success',
    user,
  });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  const { username, firstName, lastName, photo } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      username,
      firstName,
      lastName,
      photo,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const filter = req.query.keyword
    ? {
        $or: [
          {
            email: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            username: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {};
  const count = await User.countDocuments(filter);
  const users = await User.find(filter);
  if (!users.length) {
    return next(new AppError('No Users Found', 404));
  }
  res.status(200).json({ status: 'success', count, users });
});
