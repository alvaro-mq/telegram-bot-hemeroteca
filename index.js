const { Telegraf } = require('telegraf');

const { getNews } = require('./src/hemeroteca.service');
const { getText, makeHtml, getMenuConfig } = require('./src/utils');

require('dotenv').config();

const { TELEGRAM_TOKEN } = process.env;
const menu = getMenuConfig();

(async () => {
  const bot = new Telegraf(TELEGRAM_TOKEN);
  
  bot.telegram.getMe().then((bot_informations) => {
    bot.options.username = bot_informations.username;
    console.log(`Server has initialized bot nickname. Nick: ${bot_informations.username}`);
  });

  bot.start((ctx) => {
    const { message } = ctx.update;
    ctx.reply(`Bienvenid@ ${message.chat.username} a @notBoliviaBot`);
  });
  
  bot.help(async(ctx) => {
    const { message } = ctx.update;
    // TODO: Implementar comandos utiles
  });
  
  bot.command('buscar', async (ctx) => {
    let text = getText(ctx);
    const response = await getNews(text);
    if (response?.finalizado && response.datos) {
      response.datos.forEach((response) => {
        ctx.replyWithHTML(makeHtml(response));
      });
    } else {
      ctx.reply('No se encontraron resultados.');
    }
  });
  
  bot.hears('periodicos', async (ctx) => {
    const message = `Genial, aca tienes una lista de periodicos que puedes consultar.`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          menu.slice(0, menu.length/2),
          menu.slice(menu.length/2, menu.length),
        ]
      }
    })
  });

  menu.forEach((m) => {
    bot.action(m.callback_data, async (ctx) => {
      const newsPaperId = m.id;
      await getNewsPaper(ctx, newsPaperId);
    });
  });

  const getNewsPaper = async (ctx, newsPaperId) => {
    const response = await getNews(null, newsPaperId);
    if (response) {
      response.forEach((response) => {
        ctx.replyWithHTML(makeHtml(response));
      });
    } else {
      ctx.reply('No se encontraron resultados.');
    }
  };

  await bot.launch();
})();