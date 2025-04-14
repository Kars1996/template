/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

// ? Put your types here :D
// ? If doing JSX. props use React.ComponentProps<typeof YourComponent>

export type ResponseProp = {
    response: any;
    status?: number;
};

// ? Typesafety for process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string | undefined;
            NEXT_PUBLIC_APP_URL: string | undefined;
            DB_PRISMA_URL: string | undefined;
        }
    }
}
