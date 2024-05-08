import axios, { AxiosResponse } from "axios";
import { BaseResponse } from '../interfaces';
import { UserInfoFormData } from '../pages/UserInfoForm';

const API_URL = 'http://localhost:3001/'; // Replace with your API URL
const API_TOKEN = 'your-api-token'; // Replace with your API token

/**
 * `ApiClient` is a utility class that provides methods for making HTTP requests to a specific API.
 * It uses axios for making these requests.
 * @see {@link https://axios-http.com/} for more information about axios.
 */
export abstract class ApiClient {
    /**
     * Makes a GET request to the specified endpoint and returns the response data.
     * @param {string} endpoint - The endpoint to make the request to.
     * @param {Record<string, string | number | boolean>} params - The query parameters to include in the request.
     * @returns {Promise<T | null>} - A promise that resolves to the response data or null if an error occurs.
     */
    private static async get<T>(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<T | null> {
        const queryParams = {
            ...params,
            // Token: API_TOKEN,
        };

        try {
            const response: AxiosResponse<T> = await axios.get(`${API_URL}${endpoint}`, { params: queryParams });
            return response.data;
        } catch (error) {
            console.error(`Error making GET request to ${endpoint}:`, error);
            return null;
        }
    }

    /**
     * Makes a POST request to the specified endpoint with the specified body and returns the response data.
     * @param {string} endpoint - The endpoint to make the request to.
     * @param {BodyType} body - The body of the request.
     * @param {Record<string, string | number | boolean>} params - The query parameters to include in the request.
     * @returns {Promise<T | null>} - A promise that resolves to the response data or null if an error occurs.
     */
    private static async post<T, BodyType>(endpoint: string, body?: BodyType, params: Record<string, string | number | boolean> = {}): Promise<T | null> {
        const queryParams = {
            ...params,
            Token: API_TOKEN,
        };

        try {
            const response: AxiosResponse<T> = await axios.post(`${API_URL}${endpoint}`, body, { params: queryParams });
            return response.data;
        } catch (error) {
            console.error(`Error making POST request to ${endpoint}:`, error);
            throw error;
        }
    }
    
    public static async validateName(name: string): Promise<BaseResponse | null> {
        return await this.post<BaseResponse, { name: string }>('info/validate', { name });
    }

    public static async collectInfo(formData: UserInfoFormData): Promise<void> {
        await this.post<void, UserInfoFormData>('info/collect', formData);
    }

    // You can add more methods that use this.get<T>() or this.post<T, BodyType>() to interact with different endpoints.
    // For example:
    // public static fetchSomething(someParam: string): Promise<SomeType[]> {
    //     return this.get<SomeType[]>(`/some-endpoint/${someParam}`);
    // }
}