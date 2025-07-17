"use client";
import Lenis from "lenis";
import "./lenis.css";
import { useEffect, useState, createContext } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toast";
import { website } from "@/constants";
import { AnimatePresence } from "motion/react";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

type Scroll = Lenis;

type SPContextType = {
    scroll: Scroll | null;
    SPController: SPController;
    setSPController: React.Dispatch<React.SetStateAction<SPController>>;
};

type SPController = "ALLOWINIT" | "DISABLE" | "ENABLE" | "IDLE";

export const SPContext = createContext<SPContextType>(null as any);

type BaseProp = {
    children: React.ReactNode;
    className?: string;
};

export default function Body({ children, className = "" }: BaseProp) {
    const [scroll, setScroll] = useState<Lenis | null>(null);
    const [SPController, setSPController] = useState<SPController>(
        website.enableLenis ? "ALLOWINIT" : "DISABLE",
    );
    function onResize() {
        if (window.innerWidth < 1024) {
            setSPController("DISABLE");
        } else if (website.enableLenis) {
            setSPController("ENABLE");
        }
    }

    function getScroll(): Lenis | null {
        return scroll;
    }

    useEffect(() => {
        function initSP() {
            const ls = new Lenis({
                easing: (x) => {
                    return x === 0
                        ? 0
                        : x === 1
                          ? 1
                          : x < 0.5
                            ? Math.pow(2, 20 * x - 10) / 2
                            : (2 - Math.pow(2, -20 * x + 10)) / 2;
                },
                lerp: 0.15,
            });

            function raf(time: number) {
                ls.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            setScroll(ls);
        }

        function destroySP() {
            getScroll()?.destroy();
        }

        switch (SPController) {
            case "ALLOWINIT":
                if (window.innerWidth > 1024) {
                    setSPController("ENABLE");
                }
                break;
            case "DISABLE":
                destroySP();
                break;
            case "ENABLE":
                initSP();
                break;
        }

        return () => {
            destroySP();
        };
    }, [SPController]);

    useEffect(() => {
        window.addEventListener("resize", onResize);
    }, []);

    return (
        <body className={className}>
            <AnimatePresence>
                <SPContext.Provider
                    value={{
                        scroll,
                        SPController,
                        setSPController,
                    }}
                >
                    {children}
                    <Toaster />
                    <NextTopLoader
                        color={website.accentColor}
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={2} // px
                        showSpinner={false}
                        crawl
                        easing="ease"
                        speed={200}
                        shadow={`0 0 10px ${website.accentColor}, 0 0 5px ${website.accentColor}`}
                        zIndex={1600}
                        showAtBottom={false}
                    />
                </SPContext.Provider>
            </AnimatePresence>
        </body>
    );
}
