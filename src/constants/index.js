import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  HOST: process.env.SMTP_HOST,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
};

export const TEMPLATE_DIR = path.resolve('src', 'templates');
export const TMP_UPLOAD_DIR = path.resolve('src', 'tmp');
export const UPLOAD_AVATAR_DIR = path.resolve('src', 'uploads', 'avatars');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
