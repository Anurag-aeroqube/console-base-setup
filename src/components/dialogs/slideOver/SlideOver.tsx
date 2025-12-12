import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: string | number;
  children: React.ReactNode;
}

export function SlideOver({
  open,
  onClose,
  title,
  children,
  width = 450,
}: SlideOverProps) {
  const initialWidth =
    typeof width === "string" ? parseInt(width) : (width as number);

  const [currentWidth, setCurrentWidth] = useState(initialWidth);
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const isResizing = useRef(false);

  // MOUNT → then animate
  useEffect(() => {
    if (open) {
      setMounted(true);
      setTimeout(() => setAnimate(true), 20);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Resize logic
  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 350 && newWidth < window.innerWidth - 100) {
        setCurrentWidth(newWidth);
      }
    };

    const stopResize = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResize);
    };
  }, []);

  const startResize = () => {
    isResizing.current = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-accent-foreground/20 z-40  transition-opacity duration-300
          ${animate ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-background shadow-xl z-50 px-5 pt-5 overflow-y-auto
          transition-transform duration-300 ease-out
          ${animate ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ width: currentWidth }}
      >
        {/* Resize Handle */}
        <div
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-transparent hover:bg-primary/40 active:bg-primary"
          onMouseDown={startResize}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center   justify-between mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button
              onClick={onClose}
              size="icon"
              variant="ghost"
              className="p-1  cursor-pointer"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        {children}
      </div>
    </>
  );
}
