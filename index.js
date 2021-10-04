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

  const splittedUserQuery = userQuery.split("-");
  const response = await axios.get(
    `https://api.lyrics.ovh/v1/${splittedUserQuery[0]}/${splittedUserQuery[1]}`
  );

  let lyrics = response.data.lyrics;

  ctx.reply(lyrics);

  //   const lyricsObject = response.data;
  //TODO Unhandle those unsuccessful promises
  //   for (let i in lyricsObject) {
  //     if (i === "lyrics") {
  //       ctx.reply(lyricsObject.lyrics);
  //     } else {
  //       ctx.reply("No lyrics found");
  //     }
  //   }
});

bot.launch();