"use server";
import { redirect } from "next/navigation";
import getToken from "./get-token";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export default async function AuthWrapper({
    children,
    redirectTo = "/login",
    redirectIfAuthed = false,
    fallback,
}: {
    children: React.ReactNode;
    redirectTo?: string;
    redirectIfAuthed?: boolean;
    fallback?: React.ReactNode;
}) {
    const hasToken = !!(await getToken());
    if (redirectIfAuthed && hasToken) return redirect(redirectTo);
    if (!hasToken) {
        if (fallback) return fallback;
        return redirect(redirectTo);
    }
    return <>{children}</>;
}
