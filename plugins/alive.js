const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "uptime", "a"],
    desc: "Check if the bot is online and active",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
┏━━━━━━━━━━━━━━━⬣
┃     ⚡ *DIGITAL LOK ONLINE* ⚡
┗━━━━━━━━━━━━━━━⬣

✅ *Bot Status:* 𝗔𝗖𝗧𝗜𝗩𝗘 & 𝗥𝗘𝗦𝗣𝗢𝗡𝗗𝗜𝗡𝗚
👑 *Owner:* ${config.OWNER_NAME}
🧩 *Version:* 3.0.0
🎯 *Mode:* [${config.MODE}]
🎛️ *Prefix:* [${config.PREFIX}]
💾 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
🖥️ *Host:* ${os.hostname()}
⏱️ *Uptime:* ${runtime(process.uptime())}

🔗 *Powered by:* 𝗗𝗜𝗚𝗜𝗧𝗔𝗟 𝗟𝗢𝗞
┗━━━━━━━━━━━⬣`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363358310754973@newsletter',
                    newsletterName: 'SHABAN MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
