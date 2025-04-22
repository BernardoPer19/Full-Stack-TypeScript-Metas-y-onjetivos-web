import { Router } from "express";
import {
  getMetas,
  getMetaById,
  createMeta,
  updateMeta,
  deleteMeta,
} from "../controllers/metas.controller";

const MetasRouter = Router();

MetasRouter.get("/metas", getMetas);
MetasRouter.get("/metas/:id", getMetaById);
MetasRouter.post("/metas", createMeta);
MetasRouter.put("/metas/:id", updateMeta);
MetasRouter.delete("/metas/:id", deleteMeta);
