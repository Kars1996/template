// ? If doing JSX. props use React.ComponentProps<typeof YourComponent>
export type ApiResponse<T = unknown> = {
    status: number;
    data: T;
    error?: {
        code: ErrorCodeType;
        message: string;
    };
};

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export type Runtime = 'auto' | 'force-dynamic' | 'error' | 'force-static' 

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string | undefined; // On Coolify can use `SOURCE_COMMIT`
            NEXT_PUBLIC_APP_URL: string;
            DB_PRISMA_URL: string;
            REDIS_URL?: string;
        }
    }
}

// credit-ignore