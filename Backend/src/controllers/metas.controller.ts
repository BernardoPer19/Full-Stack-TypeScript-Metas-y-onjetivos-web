import { Request, Response } from "express";
import { MetaService } from "../models/metas.model";
import { getIdByName } from "../utils/MetasUtils";
import { MetaDB, MetaFrontend } from "../types/MetasTypes";
const metaService = new MetaService();

export class MetaController {
  static async getAllMetas(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.user?.user_id;

      if (!user_id) {
        res.status(400).json({ message: "User ID is missing or invalid" });
        return;
      }

      const metas = await metaService.getAll(user_id);
      res.status(200).json(metas);
    } catch (error) {
      res.status(500).json({ message: "Error fetching metas", error });
    }
  }

  static async getMetaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user_id = req.user?.user_id;

      if (!user_id) {
        res.status(400).json({ message: "User ID is missing or invalid" });
        return;
      }

      const meta = await metaService.getById(Number(id), user_id);
      if (!meta) {
        res.status(404).json({ message: "Meta not found" });
        return;
      }

      res.status(200).json(meta);
    } catch (error) {
      res.status(500).json({ message: "Error fetching meta", error });
    }
  }

  static async createMeta(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      const user_id = req.user?.user_id;
      const metaData = req.body;

      if (!user_id) {
        res.status(400).json({ message: "User ID is missing or invalid" });
        return;
      }

      const newMeta = await metaService.create({ ...metaData, user_id });
      res.status(201).json(newMeta);
    } catch (error) {
      res.status(500).json({ message: "Error creating meta", error });
    }
  }

  static async updateMeta(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const metaData = req.body;
      const user_id = req.user?.user_id;

      if (!user_id) {
        res.status(400).json({ message: "User ID is missing or invalid" });
        return;
      }

      const { prioridad, completado, etiqueta, ...rest } =
        metaData as MetaFrontend;

      const prioridad_id = await getIdByName(
        "prioridad_tb",
        "prioridad_id",
        prioridad
      );
      const completado_id = await getIdByName(
        "completado_tb",
        "completado_id",
        completado
      );
      const etiqueta_id = await getIdByName(
        "etiqueta_tb",
        "etiqueta_id",
        etiqueta
      );

      // Unir todo en un objeto compatible con MetaDB
      const metaToUpdate: Partial<MetaDB> = {
        ...rest,
        prioridad_id,
        completado_id,
        etiqueta_id,
      };

      const updatedMeta = await metaService.update(
        Number(id),
        metaToUpdate,
        user_id
      );

      if (!updatedMeta) {
        res.status(404).json({ message: "Meta not found for update" });
        return;
      }

      res.status(200).json(updatedMeta);
    } catch (error) {
      console.error("Error in updateMeta:", error);
      res.status(500).json({ message: "Error updating meta", error });
    }
  }

  static async deleteMeta(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user_id = req.user?.user_id;

      if (!user_id) {
        res.status(400).json({ message: "User ID is missing or invalid" });
        return;
      }

      const deletedMeta = await metaService.delete(Number(id));
      if (!deletedMeta) {
        res.status(404).json({ message: "Meta not found for deletion" });
        return;
      }

      res
        .status(200)
        .json({ message: "Meta deleted successfully", meta: deletedMeta });
    } catch (error) {
      res.status(500).json({ message: "Error deleting meta", error });
    }
  }
}
