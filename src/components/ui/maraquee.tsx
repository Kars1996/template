import { cn } from "@/lib/utils";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children?: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
    [key: string]: any;
}

export default function Marquee({
    className,
    reverse,
    pauseOnHover = true,
    children,
    vertical = false,
    repeat = 4,
    ...props
}: MarqueeProps) {
    return (
        <div
            {...props}
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className,
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex shrink-0 justify-around [gap:var(--gap)]",
                            {
                                "animate-marquee flex-row": !vertical,
                                "animate-marquee-vertical flex-col": vertical,
                                "group-hover:[animation-play-state:paused]":
                                    pauseOnHover,
                                "[animation-direction:reverse]": reverse,
                            },
                        )}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}
