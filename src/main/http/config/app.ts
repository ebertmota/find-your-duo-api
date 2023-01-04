import 'express-async-errors';
import express from 'express';
import { verifyEnvironmentVariables } from '../../helpers';
import { setupMiddlewares } from './middlewares';
import { setupSwagger } from './swagger';
import { setupRoutes } from './routes';

verifyEnvironmentVariables();

export const app = express();
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);
