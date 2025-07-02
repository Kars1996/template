import { getDefaultRateLimitConfig } from "@/lib/cache";
import { rateLimitMiddleware, successResponse, validateRequestBody, handleAndReturnErrorResponse } from "@/modules";
import { contactFormSchema, loginSchema } from "@/lib/validation/validations";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const defaultConfig = await getDefaultRateLimitConfig();
    const rateLimitResponse = await rateLimitMiddleware(req, defaultConfig);
    if (rateLimitResponse?.status !== 200) {
        return rateLimitResponse;
    }

    return successResponse({
        message: "Hello World!",
        status: 200,
        rateLimitResponse,
    });
}

export async function POST(req: NextRequest) {
    try {
        const defaultConfig = await getDefaultRateLimitConfig();
        const rateLimitResponse = await rateLimitMiddleware(req, {
            ...defaultConfig,
            options: {
                ...defaultConfig.options,
                maxRequests: 50,
            },
        });

        if (rateLimitResponse?.status !== 200) {
            return rateLimitResponse;
        }

        // Example: Validate contact form data
        const validatedData = await validateRequestBody(contactFormSchema, req);

        return successResponse({
            message: "Contact form submitted successfully!",
            status: 200,
            data: validatedData,
            rateLimitResponse,
        });
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}

// Example of a login endpoint with validation
export async function PUT(req: NextRequest) {
    try {
        const defaultConfig = await getDefaultRateLimitConfig();
        const rateLimitResponse = await rateLimitMiddleware(req, defaultConfig);
        
        if (rateLimitResponse?.status !== 200) {
            return rateLimitResponse;
        }

        // Validate login data
        const loginData = await validateRequestBody(loginSchema, req);

        // Simulate login logic
        if (loginData.email === "test@example.com" && loginData.password === "password123") {
            return successResponse({
                message: "Login successful!",
                status: 200,
                data: { user: { email: loginData.email } },
                rateLimitResponse,
            });
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
