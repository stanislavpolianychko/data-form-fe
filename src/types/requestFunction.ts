import { BaseResponse } from '../interfaces';

type RequestFunction = () => Promise<BaseResponse | null>;

export default RequestFunction;
