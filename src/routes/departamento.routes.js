import { Router } from "express";

export const routerDepartamentos = Router();

routerDepartamentos.get("/", (req, res) => {});

routerDepartamentos.get("/:id", (req, res) => {});

routerDepartamentos.post("/", (req, res) => {});

routerDepartamentos.delete("/:id", (req, res) => {});

routerDepartamentos.put("/:id", (req, res) => {});
