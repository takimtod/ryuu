const fetch = require('node-fetch');
const cheerio = require('cheerio');
const axios = require('axios');

  async function Hentai(text) {
    return new Promise((resolve, reject) => {
      fetch('https://nhentai.to/search?q=' + text)
        .then((response) => response.text())
        .then((html) => {
          const $ = cheerio.load(html);
          let title = [];
          let id = [];
          let thumb = [];
          let res = [];

          $('.container > .gallery').each(function (index, element) {
            title.push($(element).find('a > .caption').text());
            id.push(
              $(element).find('a').attr('href').replace('/g/', '').replace('/', '')
            );
            thumb.push($(element).find('a > img').attr('src'));
          });

          for (let i = 0; i < title.length; i++) {
            res.push({
              title: title[i],
              id: id[i],
              img: thumb[i],
            });
          }

          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

async function getId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get('https://nhentai.to/g/' + id)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          let result = {};
          let im = [];
          result.img = $('#cover > a > img').attr('src');
          result.title = $('#info > h1').text();
          result.jp = $('#info > h2').text();
          result.page = im.length;
          result.up = $('.tags > time').text();
          result.image = im;

          $('#thumbnail-container > div').each(function (index, element) {
            im.push($(element).find('a > img').attr('data-src').replace('t.', '.'));
          });

          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

module.exports = {Hentai, getId}