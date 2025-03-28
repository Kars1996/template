import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

interface ApiResponse<T = unknown> {
    status: number;
    data: T;
    error?: string;
}

export default class api {
    private static instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });

    private static async handleRequest<T>(
        promise: Promise<AxiosResponse<T>>,
    ): Promise<ApiResponse<T>> {
        try {
            const response = await promise;
            return {
                status: response.status,
                data: response.data,
            };
        } catch (error) {
            const axiosError = error as AxiosError<T>;
            return {
                status: axiosError.response?.status || 500,
                data: axiosError.response?.data as T,
                error: axiosError.message,
            };
        }
    }

    static async get<T = unknown, P = unknown>(
        url: string,
        config?: Omit<AxiosRequestConfig<P>, "url">,
    ): Promise<ApiResponse<T>> {
        return this.handleRequest(this.instance.get<T>(url, config));
    }

    static async post<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: Omit<AxiosRequestConfig<D>, "url" | "data">,
    ): Promise<ApiResponse<T>> {
        return this.handleRequest(this.instance.post<T>(url, data, config));
    }

    static async put<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: Omit<AxiosRequestConfig<D>, "url" | "data">,
    ): Promise<ApiResponse<T>> {
        return this.handleRequest(this.instance.put<T>(url, data, config));
    }

    static async delete<T = unknown>(
        url: string,
        config?: Omit<AxiosRequestConfig, "url">,
    ): Promise<ApiResponse<T>> {
        return this.handleRequest(this.instance.delete<T>(url, config));
    }

    static async patch<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: Omit<AxiosRequestConfig<D>, "url" | "data">,
    ): Promise<ApiResponse<T>> {
        return this.handleRequest(this.instance.patch<T>(url, data, config));
    }
}
