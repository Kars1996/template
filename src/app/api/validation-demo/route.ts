import { NextRequest } from "next/server";
import { 
    rateLimitMiddleware, 
    successResponse, 
    validateRequestBody, 
    validateQueryParams,
    validateFormData,
    handleAndReturnErrorResponse,
    withValidation,
    APIError
} from "@/modules";
import { 
    contactFormSchema, 
    loginSchema, 
    paginationSchema,
    userSchema 
} from "@/lib/validation/validations";
import { getDefaultRateLimitConfig } from "@/lib/cache";

// query parameter validation
export async function GET(req: NextRequest) {
    try {
        const defaultConfig = await getDefaultRateLimitConfig();
        const rateLimitResponse = await rateLimitMiddleware(req, defaultConfig);
        
        if (rateLimitResponse?.status !== 200) {
            return rateLimitResponse;
        }

        // query parameters validation
        const validatedParams = validateQueryParams(paginationSchema, req.nextUrl);

        return successResponse({
            message: "Query parameters validated successfully!",
            status: 200,
            data: {
                page: validatedParams.page,
                limit: validatedParams.limit,
            },
            rateLimitResponse,
        });
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const defaultConfig = await getDefaultRateLimitConfig();
        const rateLimitResponse = await rateLimitMiddleware(req, defaultConfig);
        
        if (rateLimitResponse?.status !== 200) {
            return rateLimitResponse;
        }

        // body validation
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

export async function PUT(req: NextRequest) {
    try {
        const defaultConfig = await getDefaultRateLimitConfig();
        const rateLimitResponse = await rateLimitMiddleware(req, defaultConfig);
        
        if (rateLimitResponse?.status !== 200) {
            return rateLimitResponse;
        }

        // form data validation
        const formData = await req.formData();
        const validatedData = validateFormData(userSchema, formData);

        return successResponse({
            message: "User data updated successfully!",
            status: 200,
            data: validatedData,
            rateLimitResponse,
        });
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}

export const PATCH = withValidation(loginSchema, async (loginData, req) => {
    const defaultConfig = await getDefaultRateLimitConfig();
    const rateLimitResponse = await rateLimitMiddleware(req, defaultConfig);
    
    if (rateLimitResponse?.status !== 200) {
        return rateLimitResponse!;
    }

    // auth sim
    if (loginData.email === "admin@example.com" && loginData.password === "admin123") {
        return successResponse({
            message: "Login successful!",
            status: 200,
            data: { 
                user: { 
                    email: loginData.email,
                    role: "admin" 
                } 
            },
            rateLimitResponse,
        });
    } else {
        throw new APIError({
            code: "unauthorized",
            message: "Invalid credentials"
        });
    }
});
