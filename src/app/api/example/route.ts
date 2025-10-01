import {
  successResponse,
  handleAndReturnErrorResponse,
  APIError,
  validateQueryParams,
  validateRequestBody,
} from "@/lib/API/handler";
import { withRateLimit, withAuth } from "@/lib/API/middleware";
import {
  contactFormSchema,
  deleteSchema,
  loginSchema,
} from "@/lib/validation/schemas";
import type { NextRequest } from "next/server";

export const GET = withRateLimit(async (req: NextRequest) => {
  return successResponse({
    message: "Hello World",
  });
});

export const POST = withRateLimit(async (req: NextRequest) => {
  try {
    const validatedData = await validateRequestBody(contactFormSchema, req);

    return successResponse({
      message: "Contact form submitted successfully",
      status: 200,
      data: validatedData,
    });
  } catch (error) {
    return handleAndReturnErrorResponse(error);
  }
});

export const PUT = withRateLimit(async (req: NextRequest) => {
  try {
    const loginData = await validateRequestBody(loginSchema, req);

    if (
      loginData.email === "test@kars.bio" &&
      loginData.password === "password123"
    ) {
      return successResponse({
        message: "Login successful!",
        status: 200,
        data: { user: { email: loginData.email } },
      });
    } else {
      throw new APIError({
        code: "unauthorized",
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    return handleAndReturnErrorResponse(error);
  }
});
export const PATCH = withAuth(async (req, token, params) => {
  try {
    const random = Math.random();
    if (random < 0.15) {
      throw new APIError({
        code: "internal_server_error",
        message: "Random error occurred",
      });
    }
    return successResponse({
      message: "Success Authenticated State",
      status: 200,
    });
  } catch (error) {
    return handleAndReturnErrorResponse(error);
  }
});

export const DELETE = withRateLimit(async (req: NextRequest) => {
  try {
    const loginData = await validateQueryParams(deleteSchema, req.nextUrl);

    if (loginData.email === "del@kars.bio") {
      return successResponse({
        message: "Account Deleted",
        status: 200,
        data: { user: { email: loginData.email } },
      });
    } else {
      throw new APIError({
        code: "unauthorized",
        message: "Invalid email",
      });
    }
  } catch (error) {
    return handleAndReturnErrorResponse(error);
  }
});
