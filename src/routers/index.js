import express from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = express.Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/api-docs', swaggerDocs());

export default router;
