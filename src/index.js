import express from 'express'
import cookieParser from 'cookie-parser'
import {
  routerAnuncios,
  routerAreas,
  routerSesion,
  routerCandidatos,
  routerCategoriaStudios,
  routerComentarios,
  routerDepartamentos,
  routerEmpresas,
  routerEstudios,
  routerExperiencias,
  routerIdiomas,
  routerNotificaciones,
  routerPaises,
  routerPostulaciones,
  routerUbicaciones,
  routerUsuarios
} from './routes/index.js'
import { PORT } from './config.js'
import { requireRefreshToken } from './middlewares/requiredToken.js'
// import { corsMiddleware } from './middlewares/cors.js'
import cors from 'cors'

const app = express()

app.disable('x-powered-by')
app.use(express.json()) // Middelware para filtrar datos json
app.use(cookieParser())
// app.use(corsMiddleware())
app.use(cors())
app.use(requireRefreshToken)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Compilacion del sistema exitoso' })
})

app.use('/anuncio', routerAnuncios) // Anuncio
app.use('/area', routerAreas) // Area
app.use('/sesion', routerSesion) // sesion
app.use('/candidato', routerCandidatos) // Candidato
app.use('/categoria_estudio', routerCategoriaStudios) // Categoria estudio
app.use('/comentario', routerComentarios) // Comentario
app.use('/departamento', routerDepartamentos) // Departamento
app.use('/empresa', routerEmpresas) // Empresa
app.use('/estudio', routerEstudios) // Estudio
app.use('/experiencia', routerExperiencias) // Experiencia
app.use('/idioma', routerIdiomas) // Idioma
app.use('/notificacion', routerNotificaciones) // Notificaciones
app.use('/pais', routerPaises) // Pais
app.use('/postulacion', routerPostulaciones) // Postulaciones
app.use('/ubicacion', routerUbicaciones) // Ubicacion
app.use('/usuario', routerUsuarios) // Usuario

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no definida' })
})

app.listen(PORT)
console.log('server port', PORT)
