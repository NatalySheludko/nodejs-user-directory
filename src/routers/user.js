import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  patchUserController,
  getUserController,
  upsertUserController,
} from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();
router.use(authenticate);

router.patch(
	'/:userId',
	isValidId,
  jsonParser,
  upload.single('avatarUrl'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

router.get(
	'/:userId',
	isValidId,
  jsonParser,
  ctrlWrapper(getUserController),
);

router.put(
	'/:userId',
	isValidId,
  jsonParser,
  ctrlWrapper(upsertUserController),
);

export default router;
