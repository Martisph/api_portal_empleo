import { Router } from "express";

export const routerCandidatos = Router();

routerCandidatos.get("/", (req, res) => {});

routerCandidatos.get("/:id", (req, res) => {});

routerCandidatos.post("/", (req, res) => {});

routerCandidatos.delete("/:id", (req, res) => {});

routerCandidatos.put("/:id", (req, res) => {});
