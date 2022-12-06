/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpResponse<T = any> = { statusCode: number; data: T };
