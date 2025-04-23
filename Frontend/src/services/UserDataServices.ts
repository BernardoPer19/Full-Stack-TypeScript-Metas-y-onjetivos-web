import {
  createMeta,
  deleteMeta,
  getAllMetas,
  getMetaById,
  updateMeta,
} from "../api/UserDataRequest";
import { GoalsDataType, MetaFrontend, UpdateGoalsType } from "../types/Metas";
import axios, { AxiosError } from "axios";

const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.errors ||
      error.message ||
      "Error desconocido de la API"
    );
  } else if (error instanceof Error) {
    return error.message || "Error desconocido";
  } else {
    return "Error desconocido";
  }
};

export const getAllGoalsServices = async (): Promise<MetaFrontend[]> => {
  try {
    const response = await getAllMetas();
    return response;
  } catch (error) {
    const backendMessage = handleAxiosError(error);
    throw new Error(backendMessage);
  }
};

export const getGoalByIdService = async (id: string): Promise<MetaFrontend> => {
  try {
    const response = await getMetaById(id);
    return response;
  } catch (error) {
    const backendMessage = handleAxiosError(error);
    throw new Error(backendMessage);
  }
};

export const createMetaService = async (
  GoalsData: GoalsDataType
): Promise<MetaFrontend> => {
  try {
    const response = await createMeta(GoalsData);
    return response;
  } catch (error) {
    const backendMessage = handleAxiosError(error);
    throw new Error(backendMessage);
  }
};

export const updateMetaService = async (
  id: string,
  data: UpdateGoalsType
): Promise<MetaFrontend> => {
  try {
    const response = await updateMeta(id, data);
    return response;
  } catch (error) {
    const backendMessage = handleAxiosError(error);
    throw new Error(backendMessage);
  }
};

export const deleteMetaService = async (id: string): Promise<void> => {
  try {
    const response = await deleteMeta(id);
    return response;
  } catch (error) {
    const backendMessage = handleAxiosError(error);
    throw new Error(backendMessage);
  }
};
