"use client"; 
import { useEffect } from "react";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

export default function() {
    useEffect(() => {
        setInterval(() => {
            console.log("%cImportant!", "color: red; font-size: x-large");
            console.log(
                "🎇 The site you are viewing has been made by Kars :D. Check me out @ https://kars.bio"
            );
        }, 2 * 1000);
    }, []);
    return <></>
};