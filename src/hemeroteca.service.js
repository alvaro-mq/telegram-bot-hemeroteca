const axios = require('axios');
require('dotenv').config();
const { URL_HEMEROTECA } = process.env;
const request = axios.create({
  baseURL: URL_HEMEROTECA,
  timeout: 8000,
});

const getNews = async(texto) => {
  try {
    let date = new Date();
    date = date.toISOString().split('T')[0];
    const url = `/noticias?noticia.fecha_desde=%27${date}%27&noticia.fecha_hasta=%27${date}%27&q=${texto}&limit=5&page=1`;
    const response = await request.get(url);
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Error al consultar el servicio', error);
    return error;
  }
};

module.exports = getNews;