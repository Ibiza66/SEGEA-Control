import { Request, Response } from "express";
import {
  createChecklistItem,
  getChecklistItems,
  getChecklistItemById,
  updateChecklistItem,
  deleteChecklistItem,
} from "../services/checklistItem.service.js";

export async function create(req: Request, res: Response) {
  try {
    const item = await createChecklistItem(req.body);

    res.status(201).json({
      message: "Ítem creado correctamente",
      item,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const items = await getChecklistItems();

    res.status(200).json({
      total: items.length,
      items,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}

export async function getById(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const item = await getChecklistItemById(req.params.id);

    res.status(200).json(item);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}

export async function update(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const item = await updateChecklistItem(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Ítem actualizado correctamente",
      item,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}

export async function remove(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    await deleteChecklistItem(req.params.id);

    res.status(200).json({
      message: "Ítem eliminado correctamente",
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}