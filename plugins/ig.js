const { igdl } = require('../lib/scrape')

let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) throw `Where is the url?\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CQU21b0JKwq/`
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `paste uer url post/reel/tv`

  igdl(args[0]).then(async res => {
    let igdl = JSON.stringify(res)
    let json = JSON.parse(igdl)
    await m.reply(global.wait)
    for (let { downloadUrl, type } of json) {
      conn.sendFile(m.chat, downloadUrl, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), '© Thakkudu2.O', m)
    }
  })

}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram)$/i

handler.limit = true

module.exports = handler
