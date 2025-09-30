import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { ValidationResult } from "@/lib/validation/validate";

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
  VALIDATION_ERROR = "validation_error",
}

export type ErrorCodeType = ErrorCode | `${ErrorCode}`;

const errorCodeToHttpStatus: Record<ErrorCodeType, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  exceeded_limit: 403,
  not_found: 404,
  conflict: 409,
  unprocessable_entity: 422,
  validation_error: 422,
  rate_limit_exceeded: 429,
  internal_server_error: 500,
};

export const httpStatusToErrorCode = Object.fromEntries(
  Object.entries(errorCodeToHttpStatus).map(([code, status]) => [status, code]),
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

interface ZodValidationError {
  field: string;
  message: string;
  code?: string;
}

export function formatZodError(zodError: z.ZodError): ZodValidationError[] {
  return zodError.issues.map((error) => ({
    field: error.path.join("."),
    message: error.message,
    code: error.code,
  }));
}

export function handleApiError(error: any): {
  error: { code: string; message: string; details?: ZodValidationError[] };
  status: number;
} {
  console.error("API error occurred: ", error.message);
  console.log(error);

  // zod errors
  if (error instanceof z.ZodError) {
    const validationErrors = formatZodError(error);
    return {
      error: {
        code: ErrorCode.VALIDATION_ERROR,
        message: "Validation failed",
        details: validationErrors,
      },
      status: errorCodeToHttpStatus[ErrorCode.VALIDATION_ERROR],
    };
  }

  // ValidationResult errors (i think)
  if (
    error &&
    typeof error === "object" &&
    "success" in error &&
    error.success === false
  ) {
    const validationResult = error as ValidationResult<unknown>;
    if ("errors" in validationResult) {
      return {
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: "Validation failed",
          details: validationResult.errors.map(
            (message: string, index: number) => ({
              field: `field_${index}`,
              message,
            }),
          ),
        },
        status: errorCodeToHttpStatus[ErrorCode.VALIDATION_ERROR],
      };
    }
  }

  // array errors
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

  const responseBody: {
    success: false;
    message: string;
    details?: ZodValidationError[];
  } = {
    success: false,
    message: error.message,
  };

  if (error.details) {
    responseBody.details = error.details;
  }

  return NextResponse.json(responseBody, { headers, status });
}

interface ResponseOptions<T = unknown> {
  message: string;
  status?: number;
  data?: T;
  rateLimitResponse?: NextResponse;
}

function copyRateLimitHeaders(
  source: NextResponse,
  target: NextResponse,
): void {
  source.headers.forEach((value, key) => {
    if (key.toLowerCase().startsWith("x-ratelimit")) {
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
    { status },
  );

  if (rateLimitResponse) {
    copyRateLimitHeaders(rateLimitResponse, response);
  }

  return response;
}

export async function validateRequestBody<T>(
  schema: z.ZodSchema<T>,
  request: Request,
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    throw new APIError({
      code: ErrorCode.BAD_REQUEST,
      message: "Invalid request body",
    });
  }
}

export function validateQueryParams<T>(schema: z.ZodSchema<T>, url: URL): T {
  try {
    const params = Object.fromEntries(url.searchParams.entries());
    return schema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    throw new APIError({
      code: ErrorCode.BAD_REQUEST,
      message: "Invalid query parameters",
    });
  }
}

export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  formData: FormData,
): T {
  try {
    const data = Object.fromEntries(formData.entries());
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    throw new APIError({
      code: ErrorCode.BAD_REQUEST,
      message: "Invalid form data",
    });
  }
}

export function withValidation<T>(
  schema: z.ZodSchema<T>,
  handler: (data: T, request: NextRequest) => Promise<NextResponse>,
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const data = await validateRequestBody(schema, request);
      return await handler(data, request);
    } catch (error) {
      return handleAndReturnErrorResponse(error);
    }
  };
}
