import axios from 'axios';

interface IGenericService<T> {
  getAllItems(url: string): Promise<T[]>;
  getItem(url: string): Promise<T | null>;
  createItem(url: string, item: T): Promise<T | null>;
  updateItem(url: string, item: T): Promise<boolean>;
  deleteItem(url: string): Promise<boolean>;
}

export class GenericService<T> implements IGenericService<T> {
  constructor() {}

  async getAllItems(url: string): Promise<T[]> {
    try {
      const { data } = await axios.get<T[]>(url);
      return data;
    } catch (error) {
      this.handleError(error, 'GET', url);
      return []; // Retorna un array vacío en caso de error
    }
  }

  async getItem(url: string): Promise<T | null> {
    try {
      const { data } = await axios.get<T>(url);
      return data;
    } catch (error) {
      this.handleError(error, 'GET', url);
      return null; // Retorna null en caso de error
    }
  }

  async createItem(url: string, item: T): Promise<T | null> {
    try {
      const { data } = await axios.post<T>(url, item);
      return data;
    } catch (error) {
      this.handleError(error, 'POST', url);
      return null; // Retorna null en caso de error
    }
  }

  async updateItem(url: string, item: T): Promise<boolean> {
    try {
      await axios.put(url, item);
      return true;
    } catch (error) {
      this.handleError(error, 'PUT', url);
      return false; // Retorna false en caso de error
    }
  }

  async deleteItem(url: string): Promise<boolean> {
    try {
      await axios.delete(url);
      return true;
    } catch (error) {
      this.handleError(error, 'DELETE', url);
      return false; // Retorna false en caso de error
    }
  }

  private handleError(error: unknown, method: string, url: string) {
    // Manejo de errores centralizado
    if (axios.isAxiosError(error)) {
      console.error(`Error during ${method} request at ${url}: ${error.message}`);
    } else {
      console.error(`Unexpected error during ${method} request at ${url}:`, error);
    }
  }
}
