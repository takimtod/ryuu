const version = require("@adiwajshing/baileys/package.json").version
const moment = require("moment-timezone");
const fs = require("fs");
const chalk = require('chalk')
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const timeWit= moment().tz('Asia/Makassar').format('HH:mm:ss')
const timeWita = moment().tz('Asia/Jayapura').format('HH:mm:ss')
const { color, bgcolor } = require('../lib/color')
const {kyun} = require("../lib/myfunc");
moment.tz.setDefault("Asia/Jakarta").locale("id");

let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString("id", {
day: 'numeric',
month: 'long',
year: 'numeric'
})



////
const totalFitur = () =>{
var mytext = fs.readFileSync("./message/help.js").toString()
var numUpper = (mytext.match(/≻/g) || []).length;
return numUpper
}

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 


let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)

let dot = new Date(new Date + 3600000)
const dateIslamic = Intl.DateTimeFormat("id" + '-TN-u-ca-islamic', {day: 'numeric',month: 'long',year: 'numeric'}).format(dot)



exports.allmenu =  ( limitCount, isPremium,thisHit, publik, sender, prefix, pushname) => {
try{ 
var saldo = db.data.users[sender].balance.toLocaleString() 
} catch{ 
var saldo = db.data.users[sender].balance
}
return `*${botName}*
${week}, ${calender} 

𝙄𝙉𝙁𝙊 𝙐𝙎𝙀𝙍 
  *Nama* : ${pushname}
  *Status* : ${isPremium ? 'Premium':'Free'}
  *Saldo* : Rp ${saldo}
  *Limit* : ${isPremium ? 'Unlimited' : `${db.data.users[sender].limit}/${limitCount}`}
  *Limit game* : ${isPremium ? 'Unlimited' : `${db.data.users[sender].glimit}`}


𝙄𝙉𝙁𝙊 𝘽𝙊𝙏 
*Nama Bot* : ${botName}
*Running* : ${runWith}
*Total fitur* : ${totalFitur()}
*Total User* : ${Object.keys(db.data.users).length}
*User Banned* : ${db.data.banned.length}
*Cmd Blocked* : ${db.data.blockcmd.length}



  ▾
    ${readmore}`}

exports.fitur = (prefix) => {
return`
乂    *Main*

 *≻*  .menu 
 *≻*  .sewa
 *≻*  .donasi
 *≻*  .owner
 *≻*  .dashboard
 *≻*  .gcbot
 *≻*  .game



乂    *Downloader*

 *≻*  .spotify ✓
 *≻*  .play ✓
 *≻*  .play2 ✓
 *≻*  .ytmp4 ✓
 *≻*  .ytmp3 ✓
 *≻*  .instagram  ✓
 *≻*  .tiktokmusik ✓
 *≻*  .tiktoknowm✓
 *≻*  .tiktokwm✓
 *≻*  .capcutdl✓
 *≻*  .capcutmusik✓
 *≻*  .mediafire ✓
 *≻*  .gdrive✓
 *≻*  .zippyshare✓
 *≻*  .gitclone  ✓
 *≻*  .ytdoc
 *≻*  .facebook  
 *≻*  .twiterdl  
 *≻*  .carimusik


乂    *Pertajam Gambar*

 *≻*  .remini    
 *≻*  .remini2
 *≻*  .pertajam
 *≻*  .color



乂    *text To Speach*

 *≻*  .tts
 *≻*  .ttsardi
 *≻*  .ttsjanie
 *≻*  .ttsdini
 *≻*  .ttsyanto



乂    *Image Filter* 

 *≻*  .biohazard
 *≻*  .anime2d
 *≻*  .recolor
 *≻*  .aiscene
 *≻*  .cartoon_3d
 *≻*  .pretty_soldier
 *≻*  .bizarre
 *≻*  .romance_comic
 *≻*  .maid_dressing
 *≻*  .superhero_comic
 *≻*  .watercolor
 *≻*  .doodle
 *≻*  .america_comic
 *≻*  .starry_girl
 *≻*  .gta5
 *≻*  .aiscene
 *≻*  .my_hero
 *≻*  .jadianime  
 *≻*  .carigambar
 *≻*  .text2img 
 *≻*  .animedif
 *≻*  .animedif2
 *≻*  .animedif3
 *≻*  .stabledif
 *≻*  .stabledif2



乂    *Chat Gpt & AI* 

 *≻*  .ai   
 *≻*  .bard   
 *≻*  .blackbox   
 *≻*  .gpt



乂    *Random* 

 *≻*  .fakta
 *≻*  .katagalau
 *≻*  .katailham
 *≻*  .bucin
 *≻*  .wamod
 *≻*  .nulis
 *≻*  .ktpmaker
 *≻*  .qc
 *≻*  .ocr
 *≻*  .menfes 628xxxxxxxxxx|nama|pesan  
 *≻*  .jarak jakarta|bandung 
 *≻*  .tagme
 *≻*  .tagwa
 *≻*  .qrcode
 *≻*  .apatuh
 *≻*  .resize
 *≻*  .ppcouple
 *≻*  .cecan 
 *≻*  .cogan 
 *≻*  .wallml 
 *≻*  .inspect 
 *≻*  .kalkulator 
 *≻*  .translate  
 *≻*  .volume 
 *≻*  .toaudio
 *≻*  .ss 
 *≻*  .tts
 *≻*  .speak
 *≻*  .speed  
 *≻*  .status 
 *≻*  .runtime  
 *≻*  .rules 



乂    *Game* 

 *≻*  .ulartangga / snake
 *≻*  .susunkata 
 *≻*  .siapaaku
 *≻*  .tekateki
 *≻*  .tebaktebakan 
 *≻*  .tebakkimia
 *≻*  .tebakgambar
 *≻*  .tebakbendera
 *≻*  .tebaklagu
 *≻*  .family100 
 *≻*  .caklontong 
 *≻*  .tebaklirik 
 *≻*  .tictactoe
 *≻*  .suit
 *≻*  .dare
 *≻*  .truth
 *≻*   nyerah



乂    *Searching* 

 *≻*  .ttsearch
 *≻*  .pinterest 
 *≻*  .gimage 
 *≻*  .lirik 
 *≻*  .yts  
 *≻*  .weather 
 *≻*  .kodepos 
 *≻*  .gempa




乂    *user* 

 *≻*  .limit 
 *≻*  .claim
 *≻*  .sewa
 *≻*  .buyglimit
 *≻*  .buylimit 
 *≻*  .transfer
 *≻*  .premium 
 *≻*  .profil 
 *≻*  .topbalance



乂     *Islami*

 *≻*  .jadwalsholat
 *≻*  .listsurah
 *≻*  .surah
 *≻*  .tafsir
 *≻*  .kisahnabi


乂    *Stalking* 

 *≻*  .ffstalk
 *≻*  .mlstalk



乂    *Short Url* 

 *≻*  .tinyurl 
 *≻*  .bitly 
 *≻*  .tourl    



乂    *𝘚𝘵𝘪𝘤𝘬𝘦𝘳* 

 *≻*  .anticolong
 *≻*  .stiktele
 *≻*  .qc
 *≻*  .qc2
 *≻*  .qc3
 *≻*  .take 
 *≻*  .sticker
 *≻*  .emojimix 😔+🤣
 *≻*  .smeme 
 *≻*  .triggered 
 *≻*  .ttp 
 *≻*  .attp 
 *≻*  .wasted 
 *≻*  .comrade 
 *≻*  .horny 
 *≻*  .blur 
 *≻*  .pixelate 
 *≻*  .simpcard 
 *≻*  .lolice 
 *≻*  .glass 




乂    *𝘎𝘳𝘰𝘶𝘱 𝘔𝘦𝘯𝘶* 


 *≻*  .totag
 *≻*  .autosimi
 *≻*  .antilink    
 *≻*  .antilinkgc   
 *≻*  .antivirtex
 *≻*  .antiasing
 *≻*  .welcome on/off
 *≻*  .addkick
 *≻*  .delkick
 *≻*  .listkick
 *≻*  .infogc 
 *≻*  .linkgc 
 *≻*  .setppgc 
 *≻*  .setnamegc 
 *≻*  .setdesc 
 *≻*  .gc open/close 
 *≻*  .revoke 
 *≻*  .hidetag 
 *≻*  .kick  _fitur ini tutup_
 *≻*  .add  _fitur ini tutup_
 *≻*  .opentime 
 *≻*  .closetime 
 *≻*  .demote 
 *≻*  .promote 
 *≻*  .kickme 
 *≻*  .ban 
 *≻*  .unban 
 *≻*  .listban 
 *≻*  .getppgc 
 *≻*  .getpp 
 *≻*  .getidgc 
 *≻*  .listonline 



乂    *𝘊𝘰𝘯𝘷𝘦𝘳𝘵𝘦𝘳* 

 *≻*  .toimg 
 *≻*  .tomp3 
 *≻*  .tomp4 
 *≻*  .toptt 
 *≻*  .togif 
 *≻*  .hode 
 *≻*  .ghost 
 *≻*  .nightcore 
 *≻*  .tupai 
 *≻*  .imut 



乂    *𝘙𝘢𝘯𝘥𝘰𝘮 𝘎𝘢𝘮𝘣𝘢𝘳* 

 *≻*  .aesthetic
 *≻*  .ahegao
 *≻*  .akira
 *≻*  .akiyama
 *≻*  .ana
 *≻*  .anjing
 *≻*  .art
 *≻*  .ass
 *≻*  .asuna
 *≻*  .ayuzawa
 *≻*  .bdsm
 *≻*  .boneka
 *≻*  .boruto
 *≻*  .bts
 *≻*  .cecan
 *≻*  .chiho
 *≻*  .chitoge
 *≻*  .cogan
 *≻*  .cosplay
 *≻*  .cosplayloli
 *≻*  .cosplaysagiri
 *≻*  .cuckold
 *≻*  .cum
 *≻*  .cyber
 *≻*  .deidara
 *≻*  .doraemon
 *≻*  .eba
 *≻*  .elaina
 *≻*  .emilia
 *≻*  .ero
 *≻*  .erza
 *≻*  .exo
 *≻*  .femdom
 *≻*  .foot
 *≻*  .freefire
 *≻*  .gamewallpaper
 *≻*  .gangbang
 *≻*  .gifs
 *≻*  .glasses
 *≻*  .gremory
 *≻*  .hekel
 *≻*  .hentai
 *≻*  .hestia
 *≻*  .hijaber
 *≻*  .hinata
 *≻*  .husbu
 *≻*  .inori
 *≻*  .islamic
 *≻*  .isuzu
 *≻*  .itachi
 *≻*  .itori
 *≻*  .jahy
 *≻*  .jeni
 *≻*  .jiso
 *≻*  .justina
 *≻*  .kaga
 *≻*  .kagura
 *≻*  .kakasih
 *≻*  .kaori
 *≻*  .kartun
 *≻*  .katakata
 *≻*  .keneki
 *≻*  .kotori
 *≻*  .kpop
 *≻*  .kucing
 *≻*  .kurumi
 *≻*  .lisa
 *≻*  .loli
 *≻*  .madara
 *≻*  .masturbation
 *≻*  .megumin
 *≻*  .mikasa
 *≻*  .mikey
 *≻*  .miku
 *≻*  .milf
 *≻*  .minato
 *≻*  .mobil
 *≻*  .motor
 *≻*  .mountain
 *≻*  .naruto
 *≻*  .neko
 *≻*  .neko2
 *≻*  .nekonime
 *≻*  .nezuko
 *≻*  .onepiece
 *≻*  .orgy
 *≻*  .panties
 *≻*  .pentol
 *≻*  .pokemon
 *≻*  .programming
 *≻*  .pubg
 *≻*  .randblackpink
 *≻*  .randomnime
 *≻*  .randomnime2
 *≻*  .rize
 *≻*  .rose
 *≻*  .ryujin
 *≻*  .sagiri
 *≻*  .sakura
 *≻*  .sasuke
 *≻*  .satanic
 *≻*  .shina
 *≻*  .shinka
 *≻*  .shinomiya
 *≻*  .shizuka
 *≻*  .shota
 *≻*  .tatasurya
 *≻*  .technology
 *≻*  .tejina
 *≻*  .tentacles
 *≻*  .thighs
 *≻*  .toukachan
 *≻*  .tsunade
 *≻*  .waifu
 *≻*  .wallhp
 *≻*  .wallml
 *≻*  .wallnime
 *≻*  .yotsuba
 *≻*  .yuki
 *≻*  .yulibocil
 *≻*  .yumeko



乂    *Sticker Anime* 
 *≻*  .cry
 *≻*  .kill
 *≻*  .hug
 *≻*  .pat
 *≻*  .lick
 *≻*  .kiss
 *≻*  .bite
 *≻*  .yeet
 *≻*  .neko
 *≻*  .bully
 *≻*  .bonk
 *≻*  .wink
 *≻*  .poke
 *≻*  .nom
 *≻*  .slap
 *≻*  .smile
 *≻*  .wave
 *≻*  .awoo
 *≻*  .blush
 *≻*  .smug
 *≻*  .glomp
 *≻*  .happy
 *≻*  .dance
 *≻*  .cringe
 *≻*  .cuddle
 *≻*  .highfive
 *≻*  .shinobu
 *≻*  .megumin
 *≻*  .handhold



乂   *𝘌𝘱𝘩𝘰𝘵𝘰*

 *≻*  .glitchtext
 *≻*  .writetext
 *≻*  .advancedglow
 *≻*  .typographytext
 *≻*  .pixelglitch
 *≻*  .neonglitch
 *≻*  .flagtext
 *≻*  .flag3dtext
 *≻*  .deletingtext
 *≻*  .blackpinkstyle
 *≻*  .glowingtext
 *≻*  .underwatertext
 *≻*  .logomaker
 *≻*  .cartoonstyle
 *≻*  .papercutstyle
 *≻*  .watercolortext
 *≻*  .effectclouds
 *≻*  .blackpinklogo
 *≻*  .gradienttext
 *≻*  .summerbeach
 *≻*  .luxurygold
 *≻*  .multicoloredneon
 *≻*  .sandsummer
 *≻*  .galaxywallpaper
 *≻*  .1917style
 *≻*  .makingneon
 *≻*  .royaltext
 *≻*  .freecreate
 *≻*  .galaxystyle
 *≻*  .lighteffects
 *≻*  .mascot 


乂    *𝘗𝘩𝘰𝘵𝘰𝘰𝘹𝘺*

 *≻*  .shadow
 *≻*  .write
 *≻*  .romantic
 *≻*  .burnpaper
 *≻*  .smoke
 *≻*  .narutobanner
 *≻*  .love
 *≻*  .undergrass
 *≻*  .doublelove
 *≻*  .coffecup
 *≻*  .underwaterocean
 *≻*  .smokyneon
 *≻*  .starstext
 *≻*  .rainboweffect
 *≻*  .balloontext
 *≻*  .metalliceffect
 *≻*  .embroiderytext
 *≻*  .flamingtext
 *≻*  .stonetext
 *≻*  .writeart
 *≻*  .summertext
 *≻*  .wolfmetaltext
 *≻*  .nature3dtext
 *≻*  .rosestext
 *≻*  .naturetypography
 *≻*  .quotesunder
 *≻*  .shinetext
 *≻*  .flaming1
 *≻*  .flaming2
 *≻*  .flaming3
 *≻*  .flaming4
 *≻*  .flaming5
 *≻*  .flaming6


乂    *𝘐𝘮𝘢𝘨𝘦 𝘔𝘢𝘬𝘦𝘳* 

 *≻*  .wanted 
 *≻*  .utatoo
 *≻*  .unsharpen    
 *≻*  .thanos    
 *≻*  .sniper    
 *≻*  .sharpen     
 *≻*  .sepia     
 *≻*  .scary    
 *≻*  .rip    
 *≻*  .redple     
 *≻*  .rejected    
 *≻*  .posterize    
 *≻*  .ps4     
 *≻*  .pixelize    
 *≻*  .missionpassed    
 *≻*  .moustache    
 *≻*  .lookwhatkarenhave   
 *≻*  .jail     
 *≻*  .invert    
 *≻*  .instagram    
 *≻*  .greyscale    
 *≻*  .glitch    
 *≻*  .gay     
 *≻*  .frame    
 *≻*  .fire    
 *≻*  .distort     
 *≻*  .dictator    
 *≻*  .deepfry     
 *≻*  .ddungeon     
 *≻*  .circle     
 *≻*  .challenger    
 *≻*  .burn    
 *≻*  .brazzers    
 *≻*  .beautiful    
 *≻*  .approved     
 *≻*  .3000years




乂    *𝘚𝘦𝘵𝘵𝘪𝘯𝘨 𝘉𝘰𝘵* 

 *≻*  .setprefix 
 *≻*  .setthumb 
 *≻*  .setppbot    
 *≻*  .setreply 
 *≻*  .setbio 
 *≻*  .setgif         
 *≻*  .setimgquoted    



乂    *𝘚𝘵𝘰𝘳𝘢𝘨𝘦*     

 *≻*  .addstik
 *≻*  .delstik  
 *≻*  .liststik  
 *≻*  .addvn    
 *≻*  .delvn 
 *≻*  .listvn 
 *≻*  .adderror     
 *≻*  .clearallerror    
 *≻*  .listerror




乂    *𝘋𝘢𝘵𝘢𝘣𝘢𝘴𝘦* 
 *≻*  .addsewa
 *≻*  .ceksewa
 *≻*  .addowner
 *≻*  .addcmdowner
 *≻*  .addcmdlimit
 *≻*  .addcmdprem
 *≻*  .listowner
 *≻*  .listcmdowner
 *≻*  .listcmdlimit
 *≻*  .listcmdprem
 *≻*  .clearallerror
 *≻*  .clearalluser
 *≻*  .clearallban
 *≻*  .clearallblock



乂    *𝘖𝘸𝘯𝘦𝘳 𝘔𝘦𝘯𝘶* 

 *≻*  .unbanwa
 *≻*  .filetozip
 *≻*  .banchat 
 *≻*  .unbanchat 
 *≻*  .chat 
 *≻*  .join 
 *≻*  .bc 
 *≻*  .bcfoto
 *≻*  .bcgc 
 *≻*  .react 
 *≻*  .block 
 *≻*  .unblock 
 *≻*  .getcase
 *≻*  .addcase
 *≻*  .getfile 
 *≻*  .listpc 
 *≻*  .listgc 
 *≻*  .> / x / c / evalcode
 *≻*  .=> / evalcode2
 *≻*  .$ / executor

`
}// 6283873541589




let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
  delete require.cache[file]
  require(file)
})
