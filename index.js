import { Telegraf } from "telegraf";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply(
    `Hi there ${ctx.from.username} \n\n Type /start to display this message \n\n For searching lyrics of any song type and send artist-song \n\n For example diamond platnumz-waah \n\n Remember to separate the artist and song name with a hyphen ( - ) \n\n And always start with the artist name then song name for better results`
  );
});

bot.on("message", async (ctx) => {
  const userQuery = ctx.message.text;

  const [artist,songName] = userQuery.split("-");

   try {
       const response = await axios.get(
    `https://api.lyrics.ovh/v1/${artist}/${songName}`
  );
    const { lyrics } = response.data;
    const formattedLyrics = lyrics
    .replace("Paroles de la chanson","")
    .replace("par","");

    ctx.reply(formattedLyrics);
  } catch (error) {
    // console.log(error);
    ctx.reply("Failed");
    //  throw error;
  }

})
bot.launch();
