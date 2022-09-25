import 'express-async-errors';
import express from 'express';

import { verifyEnvironmentVariables } from '../helpers';
import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';

verifyEnvironmentVariables();
export const app = express();
setupMiddlewares(app);
setupRoutes(app);
