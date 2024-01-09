const version = require("@adiwajshing/baileys/package.json").version


global.language = "id"
global.namaOwner = "takim"
global.nomerOwner = '628388024064' //6283873541589
global.noBot = '6283823907366'
global.instagram = ""
global.email = ""
global.runWith = "host"
global.botName = "Ryuu Bot" 
global.sessionName ="session"
global.setmenu ="location" 
global.docType = "docx"
global.public = true
global.baileysMd = true
global.antiSpam = true
global.multi = true
global.prefa = "."
global.fake = botName
global.Console = false
global.autorespon = false
global.copyright = `Bot WhatsApp⁰⁵`
global.baileysVersion = `Baileys ${version}`
global.On = "On"
global.Off ="Off"
global.autoblockcmd = false
global.fake1 ="Bot WhatsApp"
global.packName = "s.id/RyuuBot"
//global.authorName = "@takim._×"
global.replyType = "mess"
global.setwelcome = "type1"
global.autoblockcmd = false
global.autoReport = true
global.autoLevel = false
global.autoSticker = false
global.gamewaktu = 60
global.limitCount = 30
global.Intervalmsg = 1000 //detik
global.keylol = "77fd14202ab70eb09622d2d5"
global.coki1 = "eAjURMFdmE9lP2wXY0rccFI-9OqUdOozbDII5j-aO8igTwmOXeFkDFAKKgnHOI24vfNsmw."
global.coki2 = "sidts-CjIBPVxjSqIW4WHNwCYOUtw5WwfbgLD8nlpclyGvEZcUeEuXLVA2-hy_IMljiKsV5fjuxBAA"
global.rosekey = "Rs-ReiiNtNic"
global.wtfapi = ["batu"] //, "kertas", "koncil"] ilabilqis, batu
global.apiapi = "Alphabot"
global.apionichan = "gkMf-FNYa-IqTH"
global.nobg = ['jVW2tQEAj2Qo7RD2mjcv99QU','Z9XYXF8LgFeszUF3a6u5PKbJ', 'yFPL4CQFi38fAWVhVQczyrBg']
global.token = "13cc2eee-5315-4d84-b3c8-d5b05ce297c3"
global.fileStackApi ="AFkI0QMq1RgeyeQS2bZYSz"
global.gcounti = {
'prem' : 1000,
'user' : 20
} 

global.linkgc1 = "https://chat.whatsapp.com/DaBXFf82aqwHc03v22E09D"
global.linkgc2 = "https://chat.whatsapp.com/G78M55qPpAk03UCSBgkdN3"


const fs = require("fs");
const { color } = require("./lib/color");
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})






