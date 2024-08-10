import express from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = express.Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/uploads', contactsRouter);

export default router;
