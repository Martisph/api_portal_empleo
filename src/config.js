export const {
  PORT = 3000,
  DB_USER = process.env.DB_USER,
  DB_HOST = process.env.DB_HOST,
  DB_PASSWORD = process.env.DB_PASSWORD,
  DB_DATABASE = process.env.DB_DATABASE,
  DB_PORT = process.env.DB_PORT ?? 3000,
  SECRET_JWS_KEY = 'token_secreto_para_el_funcionamiento_de_la_autentificacion'
} = process.env
