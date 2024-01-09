const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const chalk = require('chalk')
const fs = require("fs")
const { color, bgcolor } = require('./color')
const gis = require("g-i-s")
const ytdl = require('ytdl-core');
const yts = require("yt-search");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cookie = require("cookie");
const token = `e2dbd0c0-d21b-45d2-b60f-d49940f2d0e7`
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36';
const urlsc = "https://fmmods.com/download-center/mega.php"
const Proxy = (url)=>(url ? `https://translate.google.com/translate?sl=en&tl=fr&hl=en&u=${encodeURIComponent(url)}&client=webapp`: '')



async function blackbox(query) {
  const url = 'https://www.blackbox.ai/api/chat';
  const userId = '7a492784-ba58-4b52-aa3b-14a2a9cdd0a9';
  const userInput = query
  const cookies = 'sessionId=2ed66013-1238-4b3d-8569-2e385720f97c; g_state={"i_l":0}; __Host-next-auth.csrf-token=49832ab2932a2dfa1698e676bd02574f468b97068b28226b1a39dafc6840d415|19eced3245bd787c855a757a04ca9fab1c536497dde3aa3e1de287e9e2804f31; __Secure-next-auth.callback-url=https://www.blackbox.ai; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..sVjspDVopruvcAuT.cCyydm_HRZsJ00-Rdft1YrsUKZOL7YQ_RpFNTGCt6l8jUiBcfAkc-KEhl51zrtAY3b1gDUVpS3crCLWsJZU1U3Vcz8v6-7rAsE077XOfINEiu8AyGDPsv_0dQdTov9C58J3--iSj8ZKfoxvTnIvlkYcMOCqAAC7RXK6Jixqp2W1MBLtaS7fe2HbgnZeI_y0HW06IzAPS7_kCoLBKvgclQ1d24xowFweRpU73v4rGuizrkmSzRAgsh06Q-jcMBWFAinNRyj04UjNy-aXzqfLAGqIpARSntDYQAzPmMnrqmMYfFO6R9jdVcmXrQ3qV4CXip0bwzSSjpPpOP9xHFo53CPGNADOog0vuESmo-7aOJO5YKrfcEw.6lMTen--sdyMsaIqcZP2MQ';

  const payload = {
    messages: [{
      id: "EQbmkyx",
      content: userInput,
      role: "user"
    }],
    previewToken: null,
    userId: userId
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookies,
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; M2010J19SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.52 Mobile Safari/537.36",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.text()//Resultnya ternyata bukan json
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function chatgpt4(q) {
  try {
    const { data } = await axios.get(`https://chatgpt4.my.id/api/processdata?question=${encodeURIComponent(encodeURIComponent(encodeURIComponent(q)))}`);
    if (data.error) {
      throw data;
    }
    return data.response;
  } catch (error) {
    throw error.response?.data || { error: "Unknown Error" };
  }
}


 async function fbdl(url) {
   return new Promise((resolve, reject) => {
     let json = {
       "id": url,
       "locale": "en"
     };

     axios({
       url: "https://getmyfb.com/process",
       method: 'POST',
       data: json,
       headers: {
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
       }
     }).then(response => {
       const $ = cheerio.load(response.data);
       const thumb = $(".results-item").find('img').attr('src');
       const desc = $(".results-item > .results-item-text").text().trim();
       const hd = $(".results-download > .results-list > .results-list-item").find('a').attr('href');
       const sd = $(".results-download > .results-list > .results-list-item").eq(1).find('a').attr('href');

       let hasil = {
         desc: desc,
         thumb: thumb,
         video_hd: hd,
         video_sd: sd
       };

       resolve(hasil);
     }).catch(error => {
       reject(error);
     });
   });
 }



async function chatgpt(prompt) {
  try {
   const response = await axios.get("https://tools.revesery.com/ai/ai.php?query=" + prompt, {
     headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36'
      }
    });
    const res = response.data
    const result = res.result
    return result
  } catch (error) {
  console.error(error)
  }
}


async function tiktokdown(url) {
  return new Promise((resolve, reject) => {
    try{
    var baseUrl = "https://api.tiklydown.eu.org/api/download?url="+url
    axios.get(baseUrl).then(({data}) => {
      resolve(data)
    })	
  } catch(e){
    reject(e)
  }
  })
}	



async function mods() {
  return new Promise((resolve, reject) => {
    const list = []
axios.get(Proxy(urlsc), {
  headers: {
    'User-Agent': userAgent,
  },
}).then((response) => {
        const $ = cheerio.load(response.data)
        $('div.su-button-center').each((i,element)=> {
            const link = $(element).find("a").attr("href");
            list.push({
                name: link.split('/')[7].replace('.', '_').replace('_apk', '.apk'),
                link: link
            });
        })
        const result = {}
        result.com_whatsapp = list && list[0] ? list[0] : undefined
        result.com_fmwhatsapp = list && list[1] ? list[1] : undefined
        result.com_gbwhatsapp = list && list[2] ? list[2] : undefined
        result.com_yowhatsapp = list && list[3] ? list[3] : undefined


        resolve(result);
      })
    })
}





async function searchfilm (query) {
  let list = [];
  try {
    let page = await axios.get(`https://www.filmapik21.sbs/?s=${query}`).catch(err => err.response);
    let html = page.data;
    let $ = cheerio.load(html);
    $(".search-page > .result-item", html).each(function() {
      let title = $(this).find("article > .details > .title").text();
      let rating = $(this).find("article > .details > .meta").text();
      let sinopsis = $(this).find("article > .details > .contenido").text();
      let thumb = $(this).find("article > .image > .thumbnail.animation-2 > a > img").attr("src");
      let url = $(this).find("article > .image > .thumbnail.animation-2 > a").attr("href");
      list.push({
        title,
        rating,
        sinopsis,
        thumb,
        url
      });
    });
    return list;
  } catch (error) {
    console.error(error);
    return [];
  }
};


const tafsir = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://tafsirq.com/topik/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('body > div:nth-child(4) > div > div.col-md-6 > div ').each(function(a, b) {
                    let result = {
                    status: 200,
                    surah: $(b).find('> div.panel-heading.panel-choco > div > div > a').text(),
                    tafsir: $(b).find('> div.panel-body.excerpt').text().trim(),
                    type: $(b).find('> div.panel-heading.panel-choco > div > div > span').text(),
                    source: $(b).find('> div.panel-heading.panel-choco > div > div > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

async function instagram4(url) {
      let res = await axios("https://indown.io/");
      let _$ = cheerio.load(res.data);
      let referer = _$("input[name=referer]").val();
      let locale = _$("input[name=locale]").val();
      let _token = _$("input[name=_token]").val();
      let { data } = await axios.post(
        "https://indown.io/download",
        new URLSearchParams({
          link: url,
          referer,
          locale,
          _token,
        }),
        {
          headers: {
            cookie: res.headers["set-cookie"].join("; "),
          },
        }
      );
      let $ = cheerio.load(data);
      let result = [];
      let __$ = cheerio.load($("#result").html());
      __$("video").each(function () {
        let $$ = $(this);
        result.push({
          type: "video",
          thumbnail: $$.attr("poster"),
          url: $$.find("source").attr("src"),
        });
      });
      __$("img").each(function () {
        let $$ = $(this);
        result.push({
          type: "image",
          url: $$.attr("src"),
        });
      });

      return result;
}


async function capcutdl(Url) {
  try {
    let { request } = await axios.get(Url);
    let res = request.res.responseUrl;
    let token = res.match(/\d+/)[0];
    const { data } = await axios({
      url: `https://ssscap.net/api/download/${token}`,
      method: 'GET',
      headers: {
        'Cookie': 'sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515'
      }
    });    
return data
  } catch (error) {
    console.log(error);
  }
}


async function instagram3(match) {
const result = []
        const form = {
          url: match,
          v: 3,
          lang: 'en'
        }
        const { data } = await axios(`https://api.downloadgram.org/media`, {
          method: 'POST',
          data: form,
          headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          }
        })
        const $ = cheerio.load(data)
                $('#downloadhere > a').each(function (a,b) {
        const url = $(b).attr('href')
        if (url) result.push(url)
      })
            return result
}


async function mediafiredll(url) {
const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
const $ = cheerio.load(res.data);
const link = $('#downloadButton').attr('href');
const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','');
const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','');
let mime = '';
let rese = await axios.head(link)
mime = rese.headers['content-type']
return { name ,size ,date ,mime ,link };
  }




async function instagram2(url) {
    let res = await axios("https://indown.io/")
    let _$ = cheerio.load(res.data)
    let referer = _$("input[name=referer]").val()
    let locale = _$("input[name=locale]").val()
    let _token = _$("input[name=_token]").val()
    let {
        data
    } = await axios.post("https://indown.io/download", new URLSearchParams({
        link: url,
        referer,
        locale,
        _token
    }), {
        headers: {
            cookie: res.headers["set-cookie"].join("; ")
        }
    })
    let $ = cheerio.load(data)
    let result = []
    let __$ = cheerio.load($("#result").html())
    __$("video").each(function() {
        let $$ = $(this)
        result.push({
            type: "video",
            thumbnail: $$.attr("poster"),
            url: $$.find("source").attr("src")
        })
    })
    __$("img").each(function() {
        let $$ = $(this)
        result.push({
            type: "image", 
            url: $$.attr("src")
        })
    })
   //console.log(`${__$}`)
    return result 
}



async function tele (query) {
    return new Promise((resolve) => {
        axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const link = []
            $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
                link.push($(b).attr('href'))
            })
            let rand = link[Math.floor(Math.random() * link.length)]
            axios.get(rand).then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                const url = []
                $$('#stickerPack > div > div.row > div > img').each(function(a, b) {
                    url.push($$(b).attr('src').split('&d=')[0])
                })
                resolve({
                    creator: 'Fajar Ihsana',
                    title: $$('#intro > div > div > h1').text(),
                    author: $$('#intro > div > div > h5 > a').text(),
                    author_link: $$('#intro > div > div > h5 > a').attr('href'),
                    sticker: url,
                })
            })
        })
    })
}





async function ytPlayMp4(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = ytdl.getVideoID(url[0])
                const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                        let vid = pormat[i]
                        video.push(vid.url)
                    }
                   }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: video[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytPlayMp3(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = ytdl.getVideoID(url[0])
                const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    status: true,
                    code: 200,
                    creator: '@tkim×',
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
                      }



async function ephoto(url, texk) {
      let form = new FormData();
      let gT = await axios.get(url, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        },
      });
      let $ = cheerio.load(gT.data);
      let text = texk;
      let token = $('input[name=token]').val();
      let build_server = $('input[name=build_server]').val();
      let build_server_id = $('input[name=build_server_id]').val();
      form.append('text[]', text);
      form.append('token', token);
      form.append('build_server', build_server);
      form.append('build_server_id', build_server_id);
      let res = await axios({
        url: url,
        method: 'POST',
        data: form,
        headers: {
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
          cookie: gT.headers['set-cookie']?.join('; '),
          ...form.getHeaders(),
        },
      });
      let $$ = cheerio.load(res.data);
      let json = JSON.parse($$('input[name=form_value_input]').val());
      json['text[]'] = json.text;
      delete json.text;
      let { data } = await axios.post(
        'https://en.ephoto360.com/effect/create-image',
        new URLSearchParams(json),
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            cookie: gT.headers['set-cookie'].join('; '),
          },
        }
      );
      return build_server + data.image;
    }

async function surah(query){ 
    let { data }= await axios.get(`https://litequran.net/${query}`)
    const $ = cheerio.load(data)
    const Result = []
    const Isi = []
    var surah = $('body > main > article > h1').text()
    var bismillah = $('body > main > article > p').text()
    $('body > main > article > ol > li:nth-child(n)').each((i, e) => {
      const arabic = $(e).find('p.arabic').text()
      const baca = $(e).find('p.translate').text()
      const arti = $(e).find('p.meaning').text()
      Isi.push({
        arabic,
        baca,
        arti,
      });
    });
    Result.push({surah, bismillah}, Isi)
    return Result
}


async function listsurah(){
  let { data }= await axios.get('https://litequran.net/')
  const $ = cheerio.load(data)
  const Result = []
  $('body > main > ol > li:nth-child(n)').each((i, e) => {
    const name_surah = $(e).find('a').text()
    const link = 'https://litequran.net/' + $(e).find('a').attr('href')
    Result.push({
      link,
      name_surah,
    });
  });
  return Result
}

async function selectSurah(link){ 
    let { data }= await axios.get(link)
    const $ = cheerio.load(data)
    const Result = []
    const Isi = []
    var surah = $('body > main > article > h1').text()
    var bismillah = $('body > main > article > p').text()
    $('body > main > article > ol > li:nth-child(n)').each((i, e) => {
      const arabic = $(e).find('p.arabic').text()
      const baca = $(e).find('p.translate').text()
      const arti = $(e).find('p.meaning').text()
      Isi.push({
        arabic,
        baca,
        arti,
      });
    });
    Result.push({surah, bismillah}, Isi)
    return Result
  }

async function getSurah(surahIndex) {
  const surahList = await listsurah();
  if (surahIndex < 1 || surahIndex > surahList.length) {
    return "Nomor surah tidak valid.";
  }
  const selectedSurah = surahList[surahIndex - 1];
  const surahContent = await selectSurah(selectedSurah.link);
  let response = `*Berikut ${surahContent[0].surah}*\n\n`;
  surahContent[1].forEach((ayah) => {
    response += `${ayah.arabic}\n${ayah.baca}\n${ayah.arti}\n\n\n`;
  });
  return response;
}


const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  return url;
}

async function Tiktok(query) {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });

  result = {};

  result.creator = "takim";
  result.title = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.nowm = await shortener(
    (response.data.links[0].a || "").replace("https", "http")
  );
  result.watermark = await shortener(
    (response.data.links[1].a || "").replace("https", "http")
  );
  result.audio = await shortener(
    (response.data.links[2].a || "").replace("https", "http")
  );
  result.thumbnail = await shortener(response.data.cover);
  return result;
}


async function ffstalk(userId) {
  let data = {
    "voucherPricePoint.id": 8050,
    "voucherPricePoint.price": "",
    "voucherPricePoint.variablePrice": "",
    "email": "",
    "n": "",
    "userVariablePrice": "",
    "order.data.profile": "",
    "user.userId": userId,
    "voucherTypeName": "FREEFIRE",
    "affiliateTrackingId": "",
    "impactClickId": "",
    "checkoutId": "",
    "tmwAccessToken": "",
    "shopLang": "in_ID",
  }
  let ff = await axios({
    "headers": {
    "Content-Type": "application/json; charset\u003dutf-8"
    },
    "method": "POST",
    "url": "https://order.codashop.com/id/initPayment.action",
    "data": data
  })
  return {
    id: userId,
    nickname: ff.data["confirmationFields"]["roles"][0]["role"]
  }
}

async function mlstalk(id, zoneId) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams(
            Object.entries({
              productId: '1',
              itemId: '2',
              catalogId: '57',
              paymentId: '352',
              gameId: id,
              zoneId: zoneId,
              product_ref: 'REG',
              product_ref_denom: 'AE',
            })
          ),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          resolve(response.data.data.gameDetail)
        })
        .catch((err) => {
          reject(err)
        })
    })
}


async function mediafire (url) {
   const res = await axios.get(url) 
   const $ = cheerio.load(res.data)
   const link = $('a#downloadButton').attr('href')
   const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
   const seplit = link.split('/')
   const nama = seplit[5]
   mime = nama.split('.')
   mime = mime[1]
   return { nama, mime, size, link }
}

async function post(url, formdata = {}, cookies) {
  let encode = encodeURIComponent;
  let body = Object.keys(formdata)
    .map((key) => {
      let vals = formdata[key];
      let isArray = Array.isArray(vals);
      let keys = encode(key + (isArray ? "[]" : ""));
      if (!isArray) vals = [vals];
      let out = [];
      for (let valq of vals) out.push(keys + "=" + encode(valq));
      return out.join("&");
    })
    .join("&");
  return await fetch(`${url}?${body}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: cookies,
    },
  });
}

async function textpro(url, text) {
  if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url))
    throw new Error("Url Salah!!");
  const geturl = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "GoogleBot",
    },
  });
  const caritoken = await geturl.text();
  let hasilcookie = geturl.headers
    .get("set-cookie")
    .split(",")
    .map((v) => cookie.parse(v))
    .reduce((a, c) => {
      return { ...a, ...c };
    }, {});
  hasilcookie = {
    __cfduid: hasilcookie.__cfduid,
    PHPSESSID: hasilcookie.PHPSESSID,
  };
  hasilcookie = Object.entries(hasilcookie)
    .map(([name, value]) => cookie.serialize(name, value))
    .join("; ");
  const $ = cheerio.load(caritoken);
  const token = $('input[name="token"]').attr("value");
  const form = new FormData();
  if (typeof text === "string") text = [text];
  for (let texts of text) form.append("text[]", texts);
  form.append("submit", "Go");
  form.append("token", token);
  form.append("build_server", "https://textpro.me");
  form.append("build_server_id", 1);
  const geturl2 = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  });
  const caritoken2 = await geturl2.text();
  const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
  if (!token2) throw new Error("Token Tidak Ditemukan!!");
  const prosesimage = await post(
    "https://textpro.me/effect/create-image",
    JSON.parse(token2[1]),
    hasilcookie
  );
  const hasil = await prosesimage.json();
  return `https://textpro.me${hasil.fullsize_image}`;
}



//Pinterest
async function pinterest(query) {
  return new Promise((resolve, reject) => {
    let err = { status: 404, message: "Terjadi kesalahan" }
    gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
     if (er) return err
     let hasil = {
      status: 200,
      creator: '@takim._×',
      result: []
     }
     res.forEach(x => hasil.result.push(x.url))
     resolve(hasil)
    })
  })
}


//KodePos
async function kodepos(kota) {
return new Promise(async (resolve, reject) => {
let postalcode = 'https://carikodepos.com/';
let url = postalcode+'?s='+kota;
await request.get({
headers: {
'Accept': 'application/json, text/javascript, */*;',
'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4209.3 Mobile Safari/537.36',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
'Origin': postalcode,
'Referer': postalcode
},
url: url,
}, function(error, response, body) {
if (error) return reject(error);
let $ = cheerio.load(body);
var search = $('tr');
if (!search.length) return reject('No result could be found');
var results = [];
search.each(function(i) {
if (i != 0) {
var td = $(this).find('td');
var result = {};
td.each(function(i) {
var value = $(this).find('a').html();
var key = (i == 0) ? 'province' : (i == 1) ? 'city' : (i == 2) ? 'subdistrict' : (i == 3) ? 'urban' : 'postalcode';
result[key] = value;
})
results.push(result);
}
});

return resolve(results);
console.log(results)
});
});
};



module.exports = {chatgpt4,blackbox, fbdl, chatgpt, tiktokdown, mods, searchfilm,getSurah, tafsir, instagram4, capcutdl, instagram3, mediafiredll,tele, instagram2, ytPlayMp4, ytPlayMp3, kodepos, pinterest, textpro, mediafire, ffstalk, mlstalk, Tiktok,surah, listsurah, ephoto}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
})