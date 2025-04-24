import axios from "../api/axios";
import { GoalsDataType, MetaFrontend, UpdateGoalsType } from "../types/Metas";
import { AxiosError } from "axios";

export const getAllMetas = async (): Promise<MetaFrontend[]> => {
  try {
    const response = await axios.get("/metas");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener datos de el usuario.");
  }
};

export const getMetaById = async (id: string): Promise<MetaFrontend> => {
  try {
    const response = await axios.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching meta with ID ${id}:`, error);
    throw error;
  }
};

export const createMeta = async (
  metaData: GoalsDataType
): Promise<MetaFrontend> => {
  try {
    const response = await axios.post(`/metas`, metaData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating meta:", error);
    throw error;
  }
};

export const updateMeta = async (
  id: number,
  metaData: UpdateGoalsType
): Promise<MetaFrontend> => {
  try {
    const response = await axios.put(`metas/${id}`, metaData);
    return response.data;
  } catch (error) {
    console.error(`Error updating meta with ID ${id}:`, error);
    throw error;
  }
};

export const deleteMeta = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`metas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting meta with ID ${id}:`, error);
    throw error;
  }
};
