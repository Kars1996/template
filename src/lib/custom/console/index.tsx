"use client";
import { useEffect } from "react";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, enquiries or used without prior consent.
Contact Kars for any enquiries
*/

export function ConsoleCredits({ isProd }: { isProd: boolean }) {
  if (isProd) {
    useEffect(() => {
      setInterval(() => {
        console.log("%cImportant!", "color: red; font-size: x-large");
        console.log(
          "🎇 The site you are viewing has been made by Kars :D. Check me out @ https://kars.bio",
        );
      }, 2 * 1000);
    }, []);
  } else {
    useEffect(() => {
      console.log("🛡 Development build of site, logging below");
    }, []);
  }
  return <></>;
}
