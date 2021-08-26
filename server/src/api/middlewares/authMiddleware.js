import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { config } from '../../config/index.js';

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.domain}/.well-known/jwks.json`,
  }),

  audience: config.audience,
  issuer: `https://${config.domain}/`,
  algorithms: ['RS256'],
});
