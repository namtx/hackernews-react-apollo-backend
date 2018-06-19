import { Prisma } from './generated/prisma'
const jwt = require('jsonwebtoken');

export interface Context {
  db: Prisma
  request: any
}

export const getUserId = (context: Context) => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error('Not authenticated');
};

export const APP_SECRET = 'GraphQL-is-aw3some';