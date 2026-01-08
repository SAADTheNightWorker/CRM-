import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function useNow() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

const slideVariants = {
  initial: { y: -28, opacity: 0, filter: "blur(2px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: 28, opacity: 0, filter: "blur(2px)" },
};

function FlipDigit({ value }) {
  return (
    <div className="flipDigit">
      <div className="splitLine" />
      <div className="shine" />

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="digitText"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function FlipBlock({ value, label }) {
  const [a, b] = String(value).split("");

  return (
    <div className="flipBlock">
      {label && <div className="ampm">{label}</div>}
      <FlipDigit value={a} />
      <FlipDigit value={b} />
    </div>
  );
}

export default function FlipClock() {
  const now = useNow();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return (
    <div className="clockWrap">
      <FlipBlock value={pad2(hours)} label={ampm} />
      <FlipBlock value={pad2(minutes)} />
    </div>
  );
}
