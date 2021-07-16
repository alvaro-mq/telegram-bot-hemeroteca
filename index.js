const { Telegraf } = require('telegraf');

const { getNews } = require('./src/hemeroteca.service');

require('dotenv').config();

const { TELEGRAM_TOKEN } = process.env;

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

  const getText = (ctx) => {
    let text = ctx.update.message.text.split(' ');
    if (text.length > 1) {
      text = ctx.update.message.text.split(' ')[1].trim();
    } else {
      text = null;
    }
    return text;
  }
  
  bot.hears('periodicos', async (ctx) => {
    const message = `Genial, aca tienes una lista de periodicos que puedes consultar.`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: 'LOS TIEMPOS',
                        callback_data: 'losTiempos'
                    },
                    {
                        text: 'PAGINA SIETE',
                        callback_data: 'paginaSiete'
                    },
                    {
                      text: 'LA PRENSA',
                      callback_data: 'laPrensa'
                    },
                ],
                [
                  {
                    text: 'OPINION',
                    callback_data: 'opinion'
                  },
                  {
                    text: 'EL DIA',
                    callback_data: 'elDia'
                  },
                  {
                    text: 'ERBOL',
                    callback_data: 'erbol'
                  }
                ],
            ]
        }
    })
  });

  bot.action('losTiempos', async (ctx) => {
    const newsPaperId = 7;
    await getNewsPaper(ctx, newsPaperId);
  });

  bot.action('paginaSiete', async (ctx) => {
    const newsPaperId = 6;
    await getNewsPaper(ctx, newsPaperId);
  });

  bot.action('laPrensa', async (ctx) => {
    const newsPaperId = 3;
    await getNewsPaper(ctx, newsPaperId);
  });

  bot.action('opinion', async (ctx) => {
    const newsPaperId = 8;
    await getNewsPaper(ctx, newsPaperId);
  });

  bot.action('elDia', async (ctx) => {
    const newsPaperId = 9;
    await getNewsPaper(ctx, newsPaperId);
  });

  bot.action('erbol', async (ctx) => {
    const newsPaperId = 11;
    await getNewsPaper(ctx, newsPaperId);
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

  const makeHtml = (news) => {
    let html = '';
    const title = `<b>${news['noticia.titulo']}</b>`;
    html = title;
    if (news['noticia.subtitulo'] !== 'S/N') {
      const subtitle = `<i>${news['noticia.subtitulo']}</i>`;
      html = `${html}
        ${subtitle}`;
    }
    const contents = `${news['noticia.contenido']}`.slice(0, 500);
    html = `${html}
    
    ${contents}...<b>Ver mas</b>`;
    const link = `<a href="${news['noticia.url']}">${news['noticia.url']}</a>`;
    html = `${html}
    ${link}`
    return html;
  };

  await bot.launch();
})();