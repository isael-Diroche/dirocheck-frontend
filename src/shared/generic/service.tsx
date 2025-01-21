import axios, { AxiosError } from 'axios';

interface IGenericService<T> {
	getAllItems(url: string): Promise<T[]>;
	getItem(url: string): Promise<T | null>;
	createItem(url: string, item: T): Promise<T | null>;
	updateItem(url: string, item: T): Promise<boolean>;
	deleteItem(url: string): Promise<boolean>;
}

export class GenericService<T> implements IGenericService<T> {
	constructor() { }

	async getAllItems(url: string): Promise<T[]> {
		try {
			const { data } = await axios.get<T[]>(url);
			if (!data) {
				throw new Error("No data received.");
			}
			return data;
		} catch (error) {
			this.handleError(error, 'GET', url);
			return []; // Return an empty array on error
		}
	}

	async getItem(url: string): Promise<T | null> {
		try {
			const { data } = await axios.get<T>(url);
			if (!data) {
				throw new Error("No data found.");
			}
			return data;
		} catch (error) {
			this.handleError(error, 'GET', url);
			return null; // Return null on error
		}
	}

	async createItem(url: string, item: T): Promise<T | null> {
		try {
			const { data } = await axios.post<T>(url, item);
			if (!data) {
				throw new Error("Failed to create item.");
			}
			return data;
		} catch (error) {
			this.handleError(error, 'POST', url);
			return null; // Return null on error
		}
	}

	async updateItem(url: string, item: T): Promise<boolean> {
		try {
			const response = await axios.put(url, item);
			if (response.status !== 200) {
				throw new Error(`Failed to update item. Status code: ${response.status}`);
			}
			return true;
		} catch (error) {
			this.handleError(error, 'PUT', url);
			return false; // Return false on error
		}
	}

	async deleteItem(url: string): Promise<boolean> {
		// 	try {
		// 		const response = await axios.delete(url);
		// 		if (response.status !== 200) {
		// 			throw new Error(`Failed to delete item. Status code: ${response.status}`);
		// 		}
		// 		return true;
		// 	} catch (error) {
		// 		this.handleError(error, 'DELETE', url);
		// 		return false; // Return false on error
		// 	}

		try {
			const response = await axios.delete(url);

			// Verifica si el estado es 2xx (indica éxito)
			if (response.status >= 200 && response.status < 300) {
				return true; // Eliminación exitosa
			}

			// Si el código no es 2xx, lanza un error
			throw new Error(`Failed to delete item. Status code: ${response.status}`);
		} catch (error) {
			this.handleError(error, 'DELETE', url);
			return false; // Retorna false en caso de error
		}
	}

	private handleError(error: unknown, method: string, url: string) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			console.error(`Error during ${method} request at ${url}: ${axiosError.message}`);
			if (axiosError.response) {
				// Log the response details
				console.error(`Response data: ${axiosError.response.data}`);
				console.error(`Response status: ${axiosError.response.status}`);
			}
		} else {
			console.error(`Unexpected error during ${method} request at ${url}:`, error);
		}
	}
}
