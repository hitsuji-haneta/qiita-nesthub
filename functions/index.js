'use strict';

const { dialogflow, HtmlResponse } = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({ debug: true });

app.intent('welcome', conv => {
  conv.ask('キータへようこそ');
  conv.ask(
    new HtmlResponse({
      url: 'https://qiita-nesthub.web.app/'
    })
  );
});

app.intent('tagList', conv => {
  conv.ask('タグを選択してください');
  conv.ask(
    new HtmlResponse({
      url: 'https://qiita-nesthub.web.app/',
      data: {
        type: 'tagList'
      }
    })
  );
});

app.intent('get articles', (conv, { tagId }) => {
  conv.ask(`${tagId}の記事を取得します。`);
  conv.ask(
    new HtmlResponse({
      url: 'https://qiita-nesthub.web.app/',
      data: {
        type: 'articles',
        tagId
      }
    })
  );
});

exports.qiitaFullfillment = functions.https.onRequest(app);
