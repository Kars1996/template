import { NextResponse } from "next/server";

// ? Credits to Maria for inspiration

export enum ErrorCode {
    BAD_REQUEST = "bad_request",
    NOT_FOUND = "not_found",
    INTERNAL_SERVER_ERROR = "internal_server_error",
    UNAUTHORIZED = "unauthorized",
    FORBIDDEN = "forbidden",
    RATE_LIMIT_EXCEEDED = "rate_limit_exceeded",
    EXCEEDED_LIMIT = "exceeded_limit",
    CONFLICT = "conflict",
    UNPROCESSABLE_ENTITY = "unprocessable_entity",
}

export type ErrorCodeType = // TODO: Find a better way to do this
        | ErrorCode
        | "bad_request"
        | "not_found"
        | "internal_server_error"
        | "unauthorized"
        | "forbidden"
        | "rate_limit_exceeded"
        | "exceeded_limit"
        | "conflict"
        | "unprocessable_entity";

const errorCodeToHttpStatus: Record<string, number> = {
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    exceeded_limit: 403,
    not_found: 404,
    conflict: 409,
    unprocessable_entity: 422,
    rate_limit_exceeded: 429,
    internal_server_error: 500,
};

export const httpStatusToErrorCode = Object.fromEntries(
    Object.entries(errorCodeToHttpStatus).map(([code, status]) => [
        status,
        code,
    ]),
) as Record<number, ErrorCodeType>;

export class APIError extends Error {
    public readonly code: ErrorCodeType;

    constructor({ code, message }: { code: ErrorCodeType; message: string }) {
        super(message);
        this.code = code;
        this.name = "APIError";
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

interface ValidationError {
    field: string;
    message: string;
}

export function handleApiError(error: any): {
    error: { code: string; message: string };
    status: number;
} {
    console.error("API error occurred", error.message);
    console.log(error);

    if (
        Array.isArray(error) &&
        error.every((e) => "field" in e && "message" in e)
    ) {
        const validationErrors = error as ValidationError[];
        return {
            error: {
                code: ErrorCode.UNPROCESSABLE_ENTITY,
                message: validationErrors
                    .map((e) => `${e.field}: ${e.message}`)
                    .join(", "),
            },
            status: errorCodeToHttpStatus[ErrorCode.UNPROCESSABLE_ENTITY],
        };
    }

    if (error instanceof APIError) {
        return {
            error: {
                code: error.code,
                message: error.message,
            },
            status: errorCodeToHttpStatus[error.code],
        };
    }

    return {
        error: {
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: "An internal server error occurred.",
        },
        status: 500,
    };
}

export function handleAndReturnErrorResponse(
    err: unknown,
    headers?: Record<string, string>,
): NextResponse {
    const { error, status } = handleApiError(err);

    return NextResponse.json<{
        success: false;
        message: string;
    }>({ success: false, message: error.message }, { headers, status });
}

interface ResponseOptions<T = unknown> {
    message: string;
    status?: number;
    data?: T;
    rateLimitResponse?: NextResponse;
}

function copyRateLimitHeaders(source: NextResponse, target: NextResponse): void {
    source.headers.forEach((value, key) => {
        if (key.toLowerCase().startsWith('x-ratelimit')) {
            target.headers.set(key, value);
        }
    });
}

export function successResponse<Body = unknown>({
    message,
    status = 200,
    data,
    rateLimitResponse,
}: ResponseOptions<Body>): NextResponse {
    const response = NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status }
    );

    if (rateLimitResponse) {
        copyRateLimitHeaders(rateLimitResponse, response);
    }

    return response;
}
