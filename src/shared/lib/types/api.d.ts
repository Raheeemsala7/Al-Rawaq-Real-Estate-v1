declare type SuccessResponse<T> = {
    success: true
    code: number;
    message?: string
    data: T
}
declare type IErrorResponse = {
    success: false
    code: number;
    message?: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare type IApiResponse<T> = SuccessResponse<T> | IErrorResponse

declare interface IPagination<T> {
    data: T[];
    metadata: {
        page: number;
        limit: number;
        totalPages: number;
        [key: string]: number;
    };
}

export interface ITimeStamp {
    createdAt: string;
    updatedAt: string;
}

export interface IResponseMessage {
    message: string
}