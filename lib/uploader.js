let axios = require('axios')
let BodyForm = require('form-data')
const FormData = require('form-data');
let { fromBuffer, stream } = require('file-type')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')
const anonfile = require('anonfile-lib')
const path = require('path');
const FileType = require('file-type');




function uploadFile(media) {
  return new Promise((resolve, reject) => {
    anonfile.upload(media)
      .then(info => {
        if (info.status !== true) {
          reject('GAGAL');
        } else {
          return axios.get(info.data.file.url.short);
        }
      })
      .then(response => {
        const $ = require("cheerio").load(response.data);
        const hasil = $("body").find("#download-url").attr("href");
        resolve(hasil);
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function upload(mediaPath) {
   return new Promise(async (resolve, reject) => {
      try {
         if (!fs.existsSync(mediaPath)) {
            throw new Error("File not found");
         }
         const media = fs.createReadStream(mediaPath);
         let form = new FormData();
         form.append("files[]", media);

         const response = await axios.post("https://pomf.lain.la/upload.php", form, {
            headers: {
               "Content-Type": "multipart/form-data",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
               ...form.getHeaders()
            }
         });
         const url = response.data.files[0].url;
         resolve(url);
      } catch (error) {
         reject(error);
      }
   });
}

function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			//console.log(data)
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

async function UploadFileUgu (input) {
	return new Promise (async (resolve, reject) => {
			const form = new BodyForm();
			form.append("files[]", fs.createReadStream(input))
			await axios({
				url: "https://uguu.se/upload.php",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
					...form.getHeaders()
				},
				data: form
			}).then((data) => {
				resolve(data.data.files[0])
			}).catch((err) => reject(err))
	})
}

async function nekoUp(file){
  try {
    const { ext } = await fileTypeFromBuffer(file);
    const bodyForm = new FormData();
    bodyForm.append("file", file, "filename." + ext);
    const response = await fetch("https://storage.neko.pe/api/upload.php", {
      method: "post",
      body: bodyForm,
      headers: new Headers({
  "User-Agent": fakeUa()
})
    });
    const data = await response.json();
    return {
      status: response.status,
      creator: "Ditzzy",
      result: data.result,
    };
  } catch (error) {
    return {
      status: 500,
      creator: "Ditzzy",
      result: "Upload failed",
      message: "Error occurred during upload:" + error
    };
  }
}

function webp2mp4File(path) {
	return new Promise((resolve, reject) => {
		 const form = new BodyForm()
		 form.append('new-image-url', '')
		 form.append('new-image', fs.createReadStream(path))
		 axios({
			  method: 'post',
			  url: 'https://s6.ezgif.com/webp-to-mp4',
			  data: form,
			  headers: {
				   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			  }
		 }).then(({ data }) => {
			  const bodyFormThen = new BodyForm()
			  const $ = cheerio.load(data)
			  const file = $('input[name="file"]').attr('value')
			  bodyFormThen.append('file', file)
			  bodyFormThen.append('convert', "Convert WebP to MP4!")
			  axios({
				   method: 'post',
				   url: 'https://ezgif.com/webp-to-mp4/' + file,
				   data: bodyFormThen,
				   headers: {
						'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				   }
			  }).then(({ data }) => {
				   const $ = cheerio.load(data)
				   const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				   resolve({
						status: true,
						message: "Created By MRHRTZ",
						result: result
				   })
			  }).catch(reject)
		 }).catch(reject)
	})
}

async function floNime(medianya, options = {}) {
const { ext } = await fromBuffer(medianya) || options.ext
        var form = new BodyForm()
        form.append('file', medianya, 'tmp.'+ext)
        jsonnya = await fetch('https://flonime.my.id/upload', {
                method: 'POST',
                body: form
        })
        .then((response) => response.json())
              .then((result) => {
                  return result
              })
              .catch(e => {
                  return e
              })
        return jsonnya
}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
const chalk = require('chalk')
const { color } = require('../lib/color')
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
})


module.exports = {TelegraPh, UploadFileUgu, webp2mp4File, floNime, uploadFile, nekoUp, upload }
