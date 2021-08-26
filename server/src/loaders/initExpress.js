import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { globalErrorHandler } from '../api/controllers/errorController.js';
import { projectRouter, userRouter } from '../api/index.js';
import { historyRouter } from '../api/routes/historyRoutes.js';
import { config } from '../config/index.js';
import { AppError } from '../utils/AppError.js';

export const initExpress = ({ app }) => {
  app.use(helmet());
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  // cors({ origin: clientOrigins })

  // Development Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  //  Middleware that transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(`${config.api.prefix}/projects`, projectRouter);
  app.use(`${config.api.prefix}/users`, userRouter);
  app.use(`${config.api.prefix}/history`, historyRouter);
  const __dirname = path.resolve();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }
  // all runs for all http methods
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
  });
  app.use(globalErrorHandler);
};
