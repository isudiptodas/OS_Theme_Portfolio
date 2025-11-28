"use client";

import { useEffect } from "react";

export default function Inspect({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const handleContextMenu = (e: any) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) ||
                (e.ctrlKey && e.key === "U")
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return <>{children}</>;
}
