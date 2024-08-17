import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
  getOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleSchema,
} from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.get('/get-oauth-url', ctrlWrapper(getOAuthUrlController));

router.post(
	'/confirm-oauth',
	jsonParser,
  validateBody(loginWithGoogleSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
