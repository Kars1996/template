import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";
import type { RateLimitConfig } from '@/modules/API/rateLimit.middleware';

export const APP_URL = process.env.NODE_ENV === 'production' ? 'https://kars.bio' : 'http://localhost:3000';

export const TOKEN_NAME = "token" as const;

interface Website {
    name: string;
    url: string;
    accentColor: string;
    baseUrl: string;
    socials?: Record<string, {
        url: string;
        icon: React.JSX.Element | LucideIcon | IconType;
    }>
}

export const website: Website = {
    name: "kars",
    url: APP_URL,
    accentColor: "#ff6666",
    baseUrl: "https://kars.bio",
} as const;

export const getDefaultRateLimitConfig = async (): Promise<RateLimitConfig> => {
    const redis = typeof window === 'undefined' && process.env.REDIS_URL 
        ? (await import('@/lib/redis')).default 
        : undefined;
    
    return {
        type: redis ? 'redis' : 'memory',
        options: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            maxRequests: 100,
            keyPrefix: 'rate-limit:',
        },
        redisClient: redis,
    };
};

export const getStrictRateLimitConfig = async (): Promise<RateLimitConfig> => {
    const defaultConfig = await getDefaultRateLimitConfig();
    return {
        ...defaultConfig,
        options: {
            ...defaultConfig.options,
            windowMs: 60 * 1000, // 1 minute
            maxRequests: 5,
        },
    };
};

export const defaultRateLimitConfigSync: Omit<RateLimitConfig, 'redisClient'> = {
    type: 'memory',
    options: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100,
        keyPrefix: 'rate-limit:',
    },
};

export const strictRateLimitConfigSync: Omit<RateLimitConfig, 'redisClient'> = {
    ...defaultRateLimitConfigSync,
    options: {
        ...defaultRateLimitConfigSync.options,
        windowMs: 60 * 1000, // 1 minute
        maxRequests: 5,
    },
};
