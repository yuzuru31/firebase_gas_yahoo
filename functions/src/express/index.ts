/**
 * コアモジュール
 */
import * as Express from 'express';
import * as Helmet from 'helmet';
import * as BodyParser from 'body-parser';
import * as Cors from 'cors';

import { v1 } from 'src/express/v1/';

/**
 * 定数
 */
import { constant } from 'src/constant';

const app = Express();

export const init = () => {
  // サーバ情報隠蔽
  app.disable('x-powered-by');

  // セキュリティ対策
  app.use(Helmet());

  // POSTリクエストを使えるようにする
  app.use(BodyParser.json({ limit: '1mb' }));

  // AUTHORIZATION Bearerチェック
  app.use(
    (
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      req.headers.authorization === constant.AUTHORIZATION_KEY
        ? next()
        : res.sendStatus(403);
    }
  );

  /**
   * ミドルウエア　エラーハンドリング
   */
  app.use(
    async (
      err: Error,
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      res.sendStatus(500);
    }
  );

  switch (constant.API_VERSION) {
    case 'v1':
      v1(app);
      break;
    default:
      break;
  }

  return app;
};
