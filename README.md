# telegram-bot-hemeroteca
Bot de telegram para buscar noticias en la [Hemeroteca de bolivia](https://intranet.agetic.gob.bo/hemeroteca)



## Instalacion y configuracion

1. Instalacion de paquetes
```
$ npm i
```
2. copiar el archivo env.sample
```
$ cp .env.sample .env
```
3. configurar archivo .env
```
TELEGRAM_TOKEN=<token>
URL_HEMEROTECA=<url_hemeroteca>
```
4. iniciar el proyecto
```
$ npm run start
```

## Comandos para el bot
1. comando ayuda
```
/help
```
2. comando buscar
```
Ej: /buscar ALGO
```
3. comando listar periodicos disponibles
```
Ej: /periodicos
```