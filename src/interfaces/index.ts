/**
 * Interface defining the structure of a validation error.
 */
interface ValidationError {
  target?: object;
  property: string;
  value?: any;
  constraints?: {
    [type: string]: string;
  };
  children?: ValidationError[];
  contexts?: {};
}

/**
 * Interface defining the structure of an update name request.
 */
export interface UpdateNameRequest {
  name: string;
}

/**
 * Interface defining the structure of an update user information request.
 */
export interface UpdateUserInfoRequest {
  name: string;
  age: number;
  married: boolean;
  dateOfBirth: string;
}

/**
 * Interface defining the base structure of a response.
 */
interface BaseResponseInterface {
  success: boolean;
  data?: any;
  errors?: ValidationError[];
}

/**
 * Interface defining the base structure of a successful response.
 */
interface BaseResponseSuccess extends BaseResponseInterface {
  success: true;
  data: any;
}

/**
 * Interface defining the base structure of an error response.
 */
interface BaseResponseError extends BaseResponseInterface {
  success: false;
  errors: ValidationError[];
}

/**
 * Union type representing both successful and error responses.
 */
export type BaseResponse = BaseResponseSuccess | BaseResponseError;
