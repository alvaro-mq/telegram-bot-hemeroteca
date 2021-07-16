const axios = require('axios');
require('dotenv').config();
const { URL_HEMEROTECA } = process.env;
const request = axios.create({
  baseURL: URL_HEMEROTECA,
  timeout: 8000,
});

const getNews = async(text, newsPaperId) => {
  try {
    let date = new Date();
    date = date.toLocaleString("bo-BO").split(' ')[0];
    let url = `/noticias?noticia.fecha_desde=%27${date}%27&noticia.fecha_hasta=%27${date}%27&limit=5&page=1`;
    if (text) {
      url = `${url}&q=${text}`;
    }
    if (newsPaperId) {
      url = `${url}&sitio_web.id=${newsPaperId}`;
    }
    const response = await request.get(url);
    const { data } = response;
    return data.datos;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

const getConfig = async () => {
  try {
    let date = new Date();
    date = date.toISOString().split('T')[0];
    const url = `sitio_web`;
    const response = await request.get(url);
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}

module.exports = { getNews, getConfig};