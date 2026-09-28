"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

type Flight = {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

let flightId = 0;

export function flyToCart(fromEl: HTMLElement | null) {
  if (typeof window === "undefined" || !fromEl) return;
  const cart =
    document.querySelector<HTMLElement>("[data-cart-target]") ??
    document.querySelector<HTMLElement>("[data-cart-open]");
  if (!cart) return;

  const from = fromEl.getBoundingClientRect();
  const to = cart.getBoundingClientRect();
  window.dispatchEvent(
    new CustomEvent<Flight>("yanelle:fly-to-cart", {
      detail: {
        id: ++flightId,
        fromX: from.left + from.width / 2,
        fromY: from.top + from.height / 2,
        toX: to.left + to.width / 2,
        toY: to.top + to.height / 2,
      },
    }),
  );
}

export function FlyToCartLayer() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function onFly(event: Event) {
      const detail = (event as CustomEvent<Flight>).detail;
      if (!detail) return;
      setFlights((prev) => [...prev, detail]);
    }
    window.addEventListener("yanelle:fly-to-cart", onFly);
    return () => window.removeEventListener("yanelle:fly-to-cart", onFly);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {flights.map((flight) => (
        <motion.div
          key={flight.id}
          className="pointer-events-none fixed z-[100] flex size-9 items-center justify-center rounded-full bg-ink text-beige shadow-lg"
          style={{ left: flight.fromX, top: flight.fromY, x: "-50%", y: "-50%" }}
          initial={{ opacity: 1, scale: 0.55 }}
          animate={{
            left: flight.toX,
            top: flight.toY,
            opacity: [1, 1, 0],
            scale: [0.55, 1.05, 0.35],
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() =>
            setFlights((prev) => prev.filter((item) => item.id !== flight.id))
          }
        >
          <ShoppingBag size={14} strokeWidth={1.6} />
        </motion.div>
      ))}
    </AnimatePresence>,
    document.body,
  );
}
