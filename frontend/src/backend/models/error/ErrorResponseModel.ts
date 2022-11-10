export interface ErrorResponseModel {
    success: boolean;
    errorCode: string;
    messages: string[];
    error: string;
}