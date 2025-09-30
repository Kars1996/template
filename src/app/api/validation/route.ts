import { NextRequest } from "next/server";
import {
  successResponse,
  validateRequestBody,
  validateQueryParams,
  validateFormData,
  withValidation,
  APIError,
  withRateLimit,
} from "@/modules";
import {
  contactFormSchema,
  loginSchema,
  paginationSchema,
  userSchema,
} from "@/lib/validation/validations";
import { getStrictRateLimitConfig } from "@/lib/cache";

export const GET = withRateLimit(async (req: NextRequest) => {
  const validatedParams = validateQueryParams(paginationSchema, req.nextUrl);

  return successResponse({
    message: "Query parameters validated successfully!",
    status: 200,
    data: {
      page: validatedParams.page,
      limit: validatedParams.limit,
    },
  });
});

export const POST = withRateLimit(async (req: NextRequest) => {
  const validatedData = await validateRequestBody(contactFormSchema, req);

  return successResponse({
    message: "Contact form submitted successfully!",
    status: 200,
    data: validatedData,
  });
});

export const PUT = withRateLimit(async (req: NextRequest) => {
  const formData = await req.formData();
  const validatedData = validateFormData(userSchema, formData);

  return successResponse({
    message: "User data updated successfully!",
    status: 200,
    data: validatedData,
  });
});

export const PATCH = withRateLimit(
  withValidation(loginSchema, async (loginData) => {
    if (
      loginData.email === "admin@example.com" &&
      loginData.password === "admin123"
    ) {
      return successResponse({
        message: "Login successful!",
        status: 200,
        data: {
          user: {
            email: loginData.email,
            role: "admin",
          },
        },
      });
    } else {
      throw new APIError({
        code: "unauthorized",
        message: "Invalid credentials",
      });
    }
  }),
);
