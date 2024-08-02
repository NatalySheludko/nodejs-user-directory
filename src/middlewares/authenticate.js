import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export async function authenticate(req, res, next) {
  if (typeof req.headers.authorization !== 'string') {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = req.headers.authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(
      createHttpError(401, 'Authorization header should be type of Bearer'),
    );
  }

  const session = await SessionsCollection.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });

  if (user === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  req.user = user;

  next();
}
