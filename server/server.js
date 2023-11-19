// ライブラリ読込
const express = require('express');
const pino = require('express-pino-logger');
const { JSDOM } = require('jsdom');

// express作成
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(pino());

// 適当にJSON返すAPI
app.get('/api/sample1', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ sample: 'Hello world!' }));
});

// 適当にWebスクレイピングしてJSON返すAPI
app.get('/api/sample2', async (req, res) => {
  // fetch でサイトとってきて dom を生成
  const url = 'https://news.yahoo.co.jp/';
  const urlRes = await fetch(url);
  const urlHtml = await urlRes.text();
  const dom = new JSDOM(urlHtml);
  // ほしい情報を querySelector などを使って取得
  const a = dom.window.document.querySelector('section a');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ sample: a.href }));
});

// サーバ起動
app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
