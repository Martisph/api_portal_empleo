import { routerAnuncios } from './routes/anuncio.routes.js'
import { routerAreas } from './routes/area.routes.js'
import { routerLogin } from './routes/autentificacion.routes.js'
import { routerCandidatos } from './routes/candidato.routes.js'
import { routerCategoriaStudios } from './routes/categoria_estudio.routes.js'
import { routerComentarios } from './routes/comentario.routes.js'
import { routerDepartamentos } from './routes/departamento.routes.js'
import { routerEmpresas } from './routes/empresa.routes.js'
import { routerEstudios } from './routes/estudio.routes.js'
import { routerExperiencias } from './routes/experiencia.routes.js'
import { routerIdiomas } from './routes/idioma.routes.js'
import { routerNotificaciones } from './routes/notificacion.routes.js'
import { routerPaises } from './routes/pais.routes.js'
import { routerPostulaciones } from './routes/postulacion.routes.js'
import { routerUbicaciones } from './routes/ubicacion.routes.js'
import { routerUsuarios } from './routes/usuario.routes.js'

import express from 'express'
import { PORT, SECRET_JWS_KEY_REFRESH } from './config.js'
import cookieParser from 'cookie-parser'

import jwt from 'jsonwebtoken'

const app = express()

app.set('view engine', 'ejs')

app.disable('x-powered-by')
app.use(express.json()) // Middelware para filtrar datos json
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token_refresh
  req.session = { user: null }
  try {
    const data = jwt.verify(token, SECRET_JWS_KEY_REFRESH)
    req.session.user = data
  } catch {}
  next()
})

app.post('/logout', (req, res) => {
  res.clearCookie('access_token').json({ message: 'Logout succesful' })
})

app.get('/', (req, res) => {
  const { user } = req.session
  res.render('index', user)
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Access not Autorized')
  res.render('protected', user)
})

app.use('/anuncio', routerAnuncios) // Anuncio
app.use('/area', routerAreas) // Area
app.use('/login', routerLogin) // login
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
