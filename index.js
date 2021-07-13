const { Telegraf } = require('telegraf');

const getNews = require('./src/hemeroteca.service');

require('dotenv').config();

const { TELEGRAM_TOKEN } = process.env;

(async () => {
  const bot = new Telegraf(TELEGRAM_TOKEN);
  
  
  bot.start((ctx) => {
    const { message } = ctx.update;
    ctx.reply(`Bienvenid@ ${message.chat.username} a @HemetorecaBot`);
  });
  
  bot.help(async(ctx) => {
    const { message } = ctx.update;
    // TODO: Implementar comandos utiles
  });
  
  bot.command('buscar', async (ctx) => {
    const texto = ctx.update.message.text.split(' ')[1].trim();
    const response = await getNews(texto);
    if (response?.finalizado && response.datos) {
      response.datos.forEach((response) => {
        ctx.replyWithHTML(makeHtml(response));
      });
    }
    ctx.reply('No se encontraron resultados.');
  });

  const makeHtml = (noticia) => {
    let html = '';
    const titulo = `<b>${noticia['noticia.titulo']}</b>`;
    html = titulo;
    if (noticia['noticia.subtitulo'] !== 'S/N') {
      const subtitulo = `<i>${noticia['noticia.subtitulo']}</i>`;
      html = `${html}
        ${subtitulo}`;
    }
    const contenido = `${noticia['noticia.contenido']}`
    html = `${html}
    
    ${contenido}`;
    const enlace = `<a href="${noticia['noticia.url']}">${noticia['noticia.url']}</a>`;
    html = `${html}
    ${enlace}`
    return html;
  };
  await bot.launch();
})();