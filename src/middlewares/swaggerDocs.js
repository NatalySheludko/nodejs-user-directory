import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import * as fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(
      fs.readFileSync(SWAGGER_PATH, { encoding: 'utf-8' }),
    );
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.log(err);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
