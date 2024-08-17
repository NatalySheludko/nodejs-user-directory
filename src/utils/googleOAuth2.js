import { OAuth2Client } from 'google-auth-library';
import createHttpError from 'http-errors';
import path from 'node:path';
import * as fs from 'node:fs';
import { env } from './env.js';

const CONFIG = JSON.parse(
  fs.readFileSync(path.resolve('src', 'google-oauth.json'), {
    encoding: 'utf-8',
  }),
);

const googleOAuthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
  redirectUri: CONFIG.web.redirect_uris[0],
});

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);

  if (typeof response.tokens.id_token === 'undefined') {
    throw createHttpError(401, 'Unauthorized');
  }

  return googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  
};
