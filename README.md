# APLICACIÓN "TODO LIST" CON REACT-NATIVE, NODE.JS, EXPRESS y MySQL

Creamos 2 carpetas: "client" y "server".

## BASE DE DATOS "MySQL"
Creamos una base de datos MySQL cuyo esquema está en:
`server/schema.sql`

https://youtu.be/YJ_XsBDc8mQ?t=849



## BACKEND:

https://youtu.be/YJ_XsBDc8mQ?t=1947

Creamos el backend en `server/`

### SERVER/PACKAGE.JSON:

1) Inicializar `package.json` con `$ yarn init -y` o bien  `$ npm init -y`.
2) Agregamos en `package.json` la linea `"type": "module"` para usar ES6 a la hora de importar dependencias etc...
3) Importamos el paquete `mysql2` para manejar conexiones y acceso a nuestra DB: `yarn add mysql2` o bien `npm i mysql2`. Eso agregará la dependencia al package.json en `dependencies`.
4) Instalar paquete `Cors` que es un middleware para hacer peticiones a nuestro localhost desde React: `yarn add cors`.
5) Instalar paquete `dotenv` que permite agregar variables de entorno: `yarn add dotenv`.
**NOTA** Ese paquete ya no es necesario en Node.JS v20:  https://migueltrevinom.medium.com/el-paquete-de-dotenv-ya-no-es-necesario-en-node-20-6-0-debd17a23be5
6) Instalar paquete `Express` para levantar un servidor: `yarn add express`.
7) Instalar paquete `nodemon` en DEV para refrescar el archivo nodeJS cuando haya cambios: `yarn add nodemon -D` (se puede hacer con "node --watch file.js" pero es experimental)
8) Creamos un script para correr `app.js`: 
  ```js
  "scripts": {
    "dev":"npx nodemo app.js"
  }
  ```

### SERVER/.ENV:
1) Creamos el archivo `server/.env` que contendrá las variables de entorno que usaremos para hacer la conexión a MySQL.
2) Por ejemplo: `MYSQL_HOST = "127.0.0.1"`


### SERVER/DATABASE.JS:

1) Creamos `server/database.js` para conectarnos a la BD. Para ello usaremos el método `mysql.createPool({...}).promise()` y le pasaremos un objeto con las variables de entorno.
1) Ahora crearemos todos los métodos que contendrán queries, por ejemplo; `getTodoById()`.

### SERVER/APP.JS:

1) En el archivo `server/app.js` vamos a crar el Server Express:








