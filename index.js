const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const { TELEGRAM_TOKEN, URL_HEMEROTECA } = process.env;
const bot = new Telegraf(TELEGRAM_TOKEN);
const request = axios.create({
  baseURL: URL_HEMEROTECA,
  timeout: 1000,
});


bot.start((ctx) => {
  const { message } = ctx.update;
  ctx.reply(`Bienvenid@ ${message.chat.username} a @HemetorecaBot`);
});

bot.help((ctx) => {
  const { message } = ctx.update;
  // TODO: Implementar comandos utiles
});

bot.command('buscar', async (ctx) => {
  const response = await axios.get('/noticias?noticia.fecha_desde=%272021-07-08%27&noticia.fecha_hasta=%272021-07-08%27&fields=noticia.fecha,noticia.contenido,noticia.imagenes,noticia.titulo,noticia.subtitulo,noticia.id,sitio_web.titulo,enlace.url&sitio_web.id=11&limit=9&page=1');
  const { data } = response;
  ctx.reply(response.data.datos[0]);
})

/* setInterval(() => {
  bot.telegram.sendMessage('30163715', 'hola');
}, 100) */

bot.launch();