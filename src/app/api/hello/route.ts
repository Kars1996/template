import {
    APIError,
    handleAndReturnErrorResponse,
    successResponse,
    withAuth,
} from "@/modules/API";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export async function GET(): Promise<Response> {
    return successResponse({
        message: "Hello",
        status: 200,
    });
}

export const POST = withAuth(async (req, token, params) => {
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
