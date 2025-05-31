const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "sim",
    alias: ["cnic", "siminfo"],
    desc: "Get SIM owner details (Owner only)",
    category: "owner",
    react: "🧾",
    filename: __filename,
    owner: true
},
async (conn, mek, m, { from, body, args, isOwner, isMe, reply }) => {
    try {
        if (!isOwner && !isMe) return reply('❌ Only owner or bot itself can use this command.');

        const number = args[0];
        if (!number) return reply('⚠️ Please provide a number.\n\nExample: *.sim 3××××××××××÷*');

        const apiUrl = `https://famofcfallxd.serv00.net/apis/newsimdata.php?num=${number}`;
        const { data } = await axios.get(apiUrl);

        if (data.status !== "success" || !data.data || !data.data.length) {
            return reply('❌ No data found for this number.');
        }

        const info = data.data[0];

        let name = info.name || '❌ Data Not Found';
        let mobile = info.mobile || '❌ Data Not Found';
        let cnic = info.cnic || '❌ Data Not Found';
        let address = info.address || '❌ Data Not Found';

        // Optional: Paid notice if essential data is missing
        if (name.includes('Not Found') || mobile.includes('Not Found') || cnic.includes('Not Found')) {
            address = `📞 For paid SIM data, contact https://wa.me/message/V4GDWW3KKE32C1`;
            name = '❌ Data Not Found';
            mobile = '❌ Data Not Found';
            cnic = '❌ Data Not Found';
        }

        const result = `<<❰ 𝑺𝑯𝑨𝑩𝑨𝑵-𝑴𝑫 ❱>>
┃ 🧑‍💻 𝗡𝗮𝗺𝗲: *${name}*
┃ 📞 𝗠𝗼𝗯𝗶𝗹𝗲: *${mobile}*
┃ 🆔 𝗖𝗡𝗜𝗖: *${cnic}*
┃ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀: *${address}*
╰─────────────➤`;

        await reply(result);

    } catch (e) {
        console.error("Error in sim command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});