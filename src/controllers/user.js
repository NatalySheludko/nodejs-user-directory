import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import { getUser, patchUser, updateUser } from '../services/user.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const patchUserController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { name, email, password } = req.body;
  const user = await getUser(userId);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }
  let updatedData = { name, email, password };

  if (password) {
    const hashedPwd = await bcrypt.hash(password, 10);
    updatedData.password = hashedPwd;
  }

  const result = await patchUser(userId, updatedData);

  if (!result) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a user!',
    data: result,
  });
};

export const patchAvatarController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const img = req.file;

  let avatarUrl;

  if (img) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(img);
    } else {
      avatarUrl = await saveFileToUploadDir(img);
    }
  }

  const result = await patchAvatar(userId, { avatarUrl });

  if (!result) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a user avatar!',
    data: result,
  });
};

export const getUserController = async (req, res, next) => {
  const { _id: userId } = req.user;

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

  const { name, email, password, avatarUrl } = req.body;

  let upsertData = { name, email, password, avatarUrl };

  if (password) {
    const hashedPwd = await bcrypt.hash(password, 10);
    upsertData.password = hashedPwd;
  }

  const user = await updateUser(userId, upsertData);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully upserted a user!`,
    data: user,
  });
};
