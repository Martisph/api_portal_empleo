import { routerAnuncios } from "./routes/anuncio.routes.js";
import { routerAreas } from "./routes/area.routes.js";
import { routerCandidatos } from "./routes/candidato.routes.js";
import { routerCategoriaStudios } from "./routes/categoria_estudio.routes.js";
import { routerComentarios } from "./routes/comentario.routes.js";
import { routerDepartamentos } from "./routes/departamento.routes.js";
import { routerEmpresas } from "./routes/empresa.routes.js";
import { routerEstudios } from "./routes/estudio.routes.js";
import { routerExperiencias } from "./routes/experiencia.routes.js";
import { routerIdiomas } from "./routes/idioma.routes.js";
import { routerNotificaciones } from "./routes/notificacion.routes.js";
import { routerPaises } from "./routes/pais.routes.js";
import { routerPostulaciones } from "./routes/postulacion.routes.js";
import { routerUbicaciones } from "./routes/ubicacion.routes.js";
import { routerUsuarios } from "./routes/usuario.routes.js";

import express, { json } from "express";
import { PORT } from "./config.js";

const app = express();

app.disable("x-powered-by"); // Desabilitamos informacion express

app.use(express.json()); // Middelware para filtrar datos json

app.use("/anuncio", routerAnuncios); // Anuncio
app.use("/area", routerAreas); // Area
app.use("/candidato", routerCandidatos); // Candidato
app.use("/categoria_estudio", routerCategoriaStudios); // Categoria estudio
app.use("/comentario", routerComentarios); // Comentario
app.use("/departamento", routerDepartamentos); // Departamento
app.use("/empresa", routerEmpresas); // Empresa
app.use("/estudio", routerEstudios); // Estudio
app.use("/experiencia", routerExperiencias); // Experiencia
app.use("/idioma", routerIdiomas); // Idioma
app.use("/notificacion", routerNotificaciones); // Notificaciones
app.use("/pais", routerPaises); // Pais
app.use("/postulacion", routerPostulaciones); // Postulaciones
app.use("/ubicacion", routerUbicaciones); // Ubicacion
app.use("/usuario", routerUsuarios); // Usuario

app.listen(PORT);
console.log("server port", PORT);
