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
    success: Boolean,
    data: T[];
    metadata: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        limit: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
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