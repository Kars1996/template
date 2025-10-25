"use client";
// @ts-ignore CSS Import Error
import Lenis from "lenis";
import { useEffect, useState, createContext } from "react";
import NextTopLoader from "nextjs-toploader";
import { website } from "@/constants";
import { Toaster } from "@/components/ui/toast";

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

export function RootProvider({ children, className = "" }: BaseProp) {
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
      const ls = new Lenis({ lerp: 0.15 });
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
    </body>
  );
}
