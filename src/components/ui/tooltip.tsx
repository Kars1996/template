/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export default function Tooltip({
    children,
    text,
}: {
    children: React.ReactNode;
    text: string;
}) {
    return (
        <div className="group relative">
            <div className="backdrop-blur-4xl pointer-events-none absolute bottom-10 left-1/2 z-[99] flex -translate-x-1/2 -translate-y-1 items-center gap-2 whitespace-nowrap rounded-2xl bg-zinc-950/75 px-3 py-1.5 text-sm text-white opacity-0 duration-200 group-hover:-translate-y-1/2 group-hover:opacity-100">
                {text}
            </div>
            {children}
        </div>
    );
}
