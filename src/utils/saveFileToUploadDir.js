import path from 'node:path';
import * as fs from 'node:fs/promises';
import { env } from './env.js';
import { TMP_UPLOAD_DIR, UPLOAD_AVATAR_DIR } from '../constants/index.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_AVATAR_DIR, file.filename),
  );

  return `${env('APP_DOMAIN')}/contacts/${file.filename}`;
};



