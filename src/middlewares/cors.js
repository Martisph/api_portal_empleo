import cors from 'cors'
const ACCEPTED_ORIGINS = [
  'http://localhost:3001',
  'http://localhost:3000'
]
export const corsMiddleware = ({ acceptedOrigin = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('Problema: CORS no permitido'))
    },
    credentials: true
  })
