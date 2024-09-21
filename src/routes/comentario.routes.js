import { Router } from "express";

export const routerComentarios  = Router();

routerComentarios.get("/", (req, res) => {});

routerComentarios.get("/:id", (req, res) => {});

routerComentarios.post("/", (req, res) => {});

routerComentarios.delete("/:id", (req, res) => {});

routerComentarios.put("/:id", (req, res) => {});
