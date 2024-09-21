import { Router } from "express";

export const routerAreas = Router();

routerAreas.get("/", (req, res) => {});

routerAreas.get("/:id", (req, res) => {});

routerAreas.post("/", (req, res) => {});

routerAreas.delete("/:id", (req, res) => {});

routerAreas.put("/:id", (req, res) => {});
