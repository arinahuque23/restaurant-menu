export interface IHttpResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}
