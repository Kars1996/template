"use client";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

import "./aos.css";
import Aos from "locomotive-aos";
import { useEffect } from "react";

export default function () {
    useEffect(() => {
        Aos.init({
            duration: 500,
            easing: "ease-in-out",
            // once: true,
        });
    }, []);
    return <></>;
}
