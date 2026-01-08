import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

const SpotlightPanel = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 250, damping: 35 });
  const y = useSpring(my, { stiffness: 250, damping: 35 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  // ✅ useMotionTemplate fixes MotionValue in CSS strings
  const spotlight1 = useMotionTemplate`
    radial-gradient(
      380px circle at ${x}px ${y}px,
      rgba(255,255,255,0.16),
      rgba(255,255,255,0.08) 35%,
      transparent 70%
    )
  `;

  const spotlight2 = useMotionTemplate`
    radial-gradient(
      700px circle at ${x}px ${y}px,
      rgba(255,255,255,0.06),
      transparent 65%
    )
  `;

  return (
    <div
      ref={ref}
      className={`spotlight-bg ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
    >
      <div className="spotlight-grid" />

      {/* main bright circle */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: spotlight1 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* soft outer glow circle */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: spotlight2 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      <div className="spotlight-content">{children}</div>
    </div>
  );
};

export default SpotlightPanel;
