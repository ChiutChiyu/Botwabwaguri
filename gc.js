// Script By Mane Dev
// Jika Ingin Repost/recode/rename jangan lupa tag gw

require('./config');
const { WA_DEFAULT_EPHEMERAL } = require('@whiskeysockets/baileys').default

function GroupParticipants(Mane, { id, participants, action, author }) {
    Mane.groupMetadata(id)
        .then(gcdata => {
            const subject = gcdata.subject

            for (const jid of participants) {
                let check = author && author !== jid && author.length > 1
                let tag = check ? [author, jid] : [jid]

                switch (action) {
                    case "add":
                        Mane.sendMessage(id, {image: {url: `https://img1.pixhost.to/images/9079/645876969_zion.jpg` }, caption: `Hai @${jid.split("@")[0]} 👋\n\nSelamat datang di *${subject}*!\nJangan lupa baca deskripsi grup dan tetap patuhi aturan. 😊✨`,
                                contextInfo: { mentionedJid: [jid] }
                            },
                            { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                        )
                        break

                    case "remove":
                        Mane.sendMessage(id, {image: {url: `https://img1.pixhost.to/images/9079/645882316_zion.jpg` }, caption: `Selamat tinggal @${jid.split("@")[0]} 👋\nSemoga sukses di luar sana! 🚀`,
                                contextInfo: { mentionedJid: [jid] }
                            },
                            { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                        )
                        break

                    case "promote":
                        if (author) {
                            Mane.sendMessage(
                                id,
                                {
                                    text: `🎉 *@${author.split("@")[0]} telah menjadikan @${jid.split("@")[0]} sebagai admin grup ini!* 👑`,
                                    contextInfo: { mentionedJid: [...tag] }
                                },
                                { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                            )
                        }
                        break

                    case "demote":
                        if (author) {
                            Mane.sendMessage(
                                id,
                                {
                                    text: `😔 *@${author.split("@")[0]} telah menghapus @${jid.split("@")[0]} dari jabatan admin grup ini.* 🚫`,
                                    contextInfo: { mentionedJid: [...tag] }
                                },
                                { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                            )
                        }
                        break

                    default:
                        console.log(`⚠️ Aksi tidak dikenal: ${action} untuk ${jid} di grup ${subject}`)
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports = GroupParticipants