/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

// ? Put your types here :D

export type ResponseProp = {
    response: any;
    status?: number;
}

// ? Typesafety for process.env
declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string | undefined;
    }
}