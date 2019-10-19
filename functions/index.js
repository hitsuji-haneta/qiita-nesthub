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

app.intent('tags', conv => {
  conv.ask('タグを取得しました');
  conv.ask(
    new HtmlResponse({
      url: 'https://qiita-nesthub.web.app/',
      data: {
        type: 'tags'
      }
    })
  );
});

exports.qiitaFullfillment = functions.https.onRequest(app);
