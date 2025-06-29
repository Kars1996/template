import { NextRequest } from 'next/server';
import { rateLimitMiddleware } from '@/modules/API/rateLimit.middleware';
import { getDefaultRateLimitConfig } from '@/lib/rateLimit';
import { successResponse } from '@/modules/API';

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
    const defaultConfig = await getDefaultRateLimitConfig();
    const rateLimitResponse = await rateLimitMiddleware(req, {
        ...defaultConfig,
        options: {
            ...defaultConfig.options,
            maxRequests: 50,
        },
    });

    return successResponse({
        message: "Post created successfully!",
        status: 200,
        rateLimitResponse,
    });
} 