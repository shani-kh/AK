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
        const status = ` *📡 SHABAN MD V5*

✅ *Status:* Active  
👑 *Owner:* ${config.OWNER_NAME}  
🧩 *Version:* 3.0.0  
🎯 *Mode:* ${config.MODE}  
🎛️ *Prefix:* ${config.PREFIX}  
💾 *RAM Usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB  
🖥️ *Host:* ${os.hostname()}  
⏱️ *Uptime:* ${runtime(process.uptime())}
__________________________________
${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/nqRfh0SB/shaban-md.jpg" },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363358310754973@newsletter',
                    newsletterName: 'MR-SHABAN⁴⁰',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
