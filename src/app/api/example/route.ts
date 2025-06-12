import { NextRequest } from 'next/server';
import { rateLimitMiddleware } from '@/modules/API/rateLimit.middleware';
import { defaultRateLimitConfig } from '@/constants';
import { successResponse } from '@/modules/API';

export async function GET(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware(req, defaultRateLimitConfig);
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
    const rateLimitResponse = await rateLimitMiddleware(req, {
        ...defaultRateLimitConfig,
        options: {
            ...defaultRateLimitConfig.options,
            maxRequests: 50,
        },
    });

    return successResponse({
        message: "Post created successfully!",
        status: 200,
        rateLimitResponse,
    });
} 