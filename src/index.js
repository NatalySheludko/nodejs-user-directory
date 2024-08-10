import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TMP_UPLOAD_DIR, UPLOAD_AVATAR_DIR } from './constants/index.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_AVATAR_DIR);
    setupServer();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

bootstrap();
