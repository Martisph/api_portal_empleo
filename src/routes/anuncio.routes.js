import { Router } from "express";

export const routerAnuncios = Router();

routerAnuncios.get("/", (req, res) => {});

routerAnuncios.get("/:id", (req, res) => {});

routerAnuncios.post("/", (req, res) => {});

routerAnuncios.delete("/:id", (req, res) => {});

routerAnuncios.put("/:id", (req, res) => {});
