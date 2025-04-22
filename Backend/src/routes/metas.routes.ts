import { Router } from "express";
import { MetaController } from "../controllers/metas.controller";

const UserRouter = Router();

UserRouter.get("/", MetaController.getAllMetas);
UserRouter.get("/:id", MetaController.getMetaById);
UserRouter.post("/", MetaController.createMeta);
UserRouter.put("/:id", MetaController.updateMeta);
UserRouter.delete("/:id", MetaController.deleteMeta);

export default UserRouter;
