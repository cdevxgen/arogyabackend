// en este archivo de config vamos a usar nuestras variables de ambiente del archivo .env para luego usarlas
// en cualquier lugar de la app

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  MAILTRAP_USER: process.env.MAILTRAP_USER,
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
  MAILTRAP_HOST: process.env.MAILTRAP_HOST,
  MAILTRAP_PORT: process.env.MAILTRAP_PORT,
};
