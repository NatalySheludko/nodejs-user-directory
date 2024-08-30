import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import { getUser, patchUser, updateUser } from '../services/user.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const img = req.file;

  let avatarUrl;

  if (img) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(img);
    } else {
      avatarUrl = await saveFileToUploadDir(img);
    }
  }

  const result = await patchUser(userId, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatarUrl: avatarUrl,
  });

  if (!result) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a user!',
    data: result,
  });
};

export const getUserController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await getUser(userId);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully found user information!',
    data: user,
  });
};

export const upsertUserController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await updateUser(userId, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatarUrl: req.file,
  });

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully upserted a user!`,
    data: user,
  });
};
