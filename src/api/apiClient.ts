import axios, { AxiosResponse } from 'axios';
import { BaseResponse, UpdateNameRequest, UpdateUserInfoRequest } from '../interfaces';

const API_URL = 'http://localhost:3001/';

/**
 * `ApiClient` is a utility class that provides methods for making HTTP requests to a specific API.
 * It uses axios for making these requests.
 * @see {@link https://axios-http.com/} for more information about axios.
 */
export abstract class ApiClient {
  /**
   * Makes a POST request to the specified endpoint with the specified body and returns the response data.
   * @param {string} endpoint - The endpoint to make the request to.
   * @param {BodyType} body - The body of the request.
   * @param {Record<string, string | number | boolean>} params - The query parameters to include in the request.
   * @returns {Promise<T | null>} - A promise that resolves to the response data or null if an error occurs.
   */
  private static async post<T, BodyType>(
    endpoint: string,
    body?: BodyType,
    params: Record<string, string | number | boolean> = {},
  ): Promise<T | null> {
    const queryParams = {
      ...params,
    };

    try {
      const response: AxiosResponse<T> = await axios.post(
        `${API_URL}${endpoint}`,
        body,
        { params: queryParams },
      );
      return response.data;
    } catch (error) {
      console.error(`Error making POST request to ${endpoint}:`, error);
      throw error;
    }
  }

  public static async validateName(name: UpdateNameRequest): Promise<BaseResponse | null> {
    return await this.post<BaseResponse, UpdateNameRequest>('info/validate', name);
  }

  public static async collectInfo(formData: UpdateUserInfoRequest): Promise<BaseResponse | null> {
    return await this.post<BaseResponse, UpdateUserInfoRequest>('info/collect', formData);
  }
}
