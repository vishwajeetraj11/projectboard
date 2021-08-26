import { AppError } from '../../utils/AppError.js';
import { getUserDetails } from '../../utils/auth0.js';
import { catchAsync } from '../../utils/catchAsync.js';
import jwt_decode from 'jwt-decode';

export const authorizeMiddleware = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        next(new AppError('Authorization Token was not found!', 404));
      }
      // const { data } = await getUserDetails(token);
      const decoded = jwt_decode(token);
      req.user = decoded;
      const userId = req.user.sub.split('|')[1];
      req.user.userId = userId;
      next();
    } catch (error) {
      next(new AppError('Authorization Error', 404));
    }
  }
});
