import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();
router.use(authenticate);

router.get('/',
	ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
	isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  jsonParser,
	validateBody(createContactSchema),
	upload.single('photo'),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:contactId',
  isValidId,
  jsonParser,
  upload.single('photo'),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
);

export default router;
