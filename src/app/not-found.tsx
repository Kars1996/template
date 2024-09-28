import { redirect } from "next/navigation";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export default function () {
    // ? This function automatically redirects users
    // ? If you wanted, you could make your own 404 page!
    // ? Personally I prefer it as a standalone "404" url instead
    redirect("/404");
    return <p>Your normal HTML Code here</p>;
}
