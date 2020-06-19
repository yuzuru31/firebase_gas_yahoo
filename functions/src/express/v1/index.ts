/**
 * コアモジュール
 */
import * as Express from 'express';

import { yahoo } from 'src/express/v1/yahoo';

const route = '/v1';

export const v1 = (app: Express.Application) => {
  app.post(route + '/yahoo', yahoo);
};
