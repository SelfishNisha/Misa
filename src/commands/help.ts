import { EmbedBuilder, type Message } from "discord.js";

async function help(msg: Message) {
  let helpEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Misa Help")
    .setDescription("-")
    .addFields(
      { name: "\`misa\`", value: "Registers you into the database, if you are already registered, it'll do the same as \`misa help\`" },
      { name: "\`misa help\`", value: "Displays this help message." }
    )
    .setFooter({ text: `Requested by ${msg.author.tag}` });
  await msg.reply({ embeds: [helpEmbed] });
}

export { help };