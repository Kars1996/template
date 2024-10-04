"use client";
import "./aos.css";
import Aos from "locomotive-aos";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export default function AOSComponent() {
    const pathname = usePathname();

    useEffect(() => {
        const initAOS = () => {
            Aos.init({
                duration: 500,
                easing: "ease-in-out",
            });
        };

        initAOS();

        const reinitTimeout = setTimeout(() => {
            Aos.init();
        }, 100);

        return () => {
            clearTimeout(reinitTimeout);
        };
    }, [pathname]);

    return null;
}
