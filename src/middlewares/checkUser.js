import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export function checkUser(req, res, next) {
  const authHeaded = req.headers['authorization'];
  const token = authHeaded && authHeaded.split(' ')[1];

  if (token) {
    jwt.verify(token, env('JWT_SECRET'), async function (err, decodedToken) {
      if (err) {
        console.log(err);
        req.user = null;
        next();
      } else {
        let user = await UsersCollection.findById(decodedToken.id);
        req.user = user;
        next();
      }
    });
  } else {
    req.user = null;
    next(createHttpError(401, 'Token is not found'));
  }
}
