const getText = (ctx) => {
  let text = ctx.update.message.text.split(' ');
  if (text.length > 1) {
    text = ctx.update.message.text.split(' ')[1].trim();
  } else {
    text = null;
  }
  return text;
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
}

const getMenuConfig = () => [
  {
    id: 3,
    text: 'LA PRENSA',
    callback_data: 'laPrensa',
  },
  {
    id: 6,
    text: 'PAGINA SIETE',
    callback_data: 'paginaSiete',
  },
  {
    id: 7,
    text: 'LOS TIEMPOS',
    callback_data: 'losTiempos',
  },
  {
    id: 8,
    text: 'OPINION',
    callback_data: 'opinion',
  },
  {
    id: 9,
    text: 'EL DIA',
    callback_data: 'elDia',
  },
  {
    id: 11,
    text: 'ERBOL',
    callback_data: 'erbol'
  }
];

const makeInline = (news, url) => news?.map((element) => 
  ({
    type: 'article',
    id: element['noticia.id'].toString(),
    title: element['noticia.titulo'],
    thumb_url: `${url}/public/${element['noticia.imagenes']}`,
    description: element['noticia.contenido'].substr(0, 300),
    url: element['noticia.url'],  
    input_message_content: {
      message_text: generarDescripcion(
        element['noticia.titulo'],
        element['noticia.url'],
        element['noticia.imagenes'],
        element['noticia.contenido'].substr(0, 300),
      ),
      parse_mode: 'HTML',
      disable_web_page_preview: false,
    },
  })
);

const generarDescripcion = (titulo, link, imagen, descripcion) => {
  let text = `<a href="${imagen}">&#8205;</a>`;
  text += `<a href="${link}">${titulo}</a>\n`;
  text += String(descripcion);
  return text;
};

module.exports = {
  getText,
  makeHtml,
  getMenuConfig,
  makeInline,
};
