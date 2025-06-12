import { NextRequest } from 'next/server';
import { rateLimitMiddleware } from '@/modules/API/rateLimit.middleware';
import { defaultRateLimitConfig } from '@/constants';
import { successResponse } from '@/modules/API';

export async function GET(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware(req, defaultRateLimitConfig);
        if (rateLimitResponse?.status !== 200) {
        return rateLimitResponse;
    }

    const apiResponse = successResponse({
        message: "Hello World!",
        status: 200,
    });
    
    rateLimitResponse?.headers.forEach((value, key) => {
        if (key.toLowerCase().startsWith('x-ratelimit')) {
            apiResponse.headers.set(key, value);
        }
    });

    return apiResponse;
}

export async function POST(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware(req, {
        ...defaultRateLimitConfig,
        options: {
            ...defaultRateLimitConfig.options,
            maxRequests: 50,
        },
    });

    if (rateLimitResponse?.status !== 200) {
        return rateLimitResponse;
    }

    const apiResponse = successResponse({
        message: "Post created successfully!",
        status: 200,
    });
    
    rateLimitResponse?.headers.forEach((value, key) => {
        if (key.toLowerCase().startsWith('x-ratelimit')) {
            apiResponse.headers.set(key, value);
        }
    });

    return apiResponse;
} 