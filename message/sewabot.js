
exports.dada = (prefix, pushname, ucapanWaktu) => {
return `${ucapanWaktu} kak ${pushname}
Berikut adalah list harga untuk sewa bot

╭────✎「 *SEWA BOT* 」
│ *Harga!*
│• Rp. 20.000/group
│•> Masa aktif 35 hari
│• Perpanjang Rp. 10.000
│-----------------------
│• Rp. 50.000/groub
│• > Masa aktif 75 hari
│• Perpanjang Rp 40.000
╰─────────❍


╭────✎「 *SEWA BOT HEMAT* 」
│ *Harga!*
│• Rp. 5.000/group
│• > Masa aktif 7 hari
│--------------------------
│• Rp. 25.000/groub
│• > Masa aktif 30 hari
│• > Bonus premium 30 hari 
╰─────────❍

*Mari sewa Bot ini agar bisa masuk di grub kamu dan nikmati fitur game nya*

*PAYMENT*:
𖦹 Via Dana
𖦹 Via Pulsa
- 


_Silahkan ketik .owner untuk mengetahui pemilik bot ini_
`
}

const fs = require("fs");
const { color } = require("../lib/color");
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})

    




















