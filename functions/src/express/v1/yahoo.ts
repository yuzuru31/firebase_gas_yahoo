/**
 * コアモジュール
 */
import * as Express from 'express';
const cheerio = require('cheerio');

interface i_create extends Express.Request {
  body: {
    source: string;
  };
}

export const yahoo = async (req: i_create, res: Express.Response) => {
  try {
    const $ = cheerio.load(req.body.source);

    const _li = $('main article section ul').eq(0).find('li');

    res.send({
      list: _li
        .map(function (i) {
          return {
            title: _li.eq(i).text(),
            url: _li.eq(i).find('a').attr()['href'],
          };
        })
        .get(),
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
