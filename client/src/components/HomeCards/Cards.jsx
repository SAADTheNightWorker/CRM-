import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const FancyCard = ({ item, idx }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;

    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <Link to={item?.link} className="block">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: idx * 0.04 }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fancy-card w-full min-h-[22vh] cursor-pointer relative group"
      >
        {/* glow border + sheen */}
        <div className="fancy-border" />
        <div className="fancy-sheen" />

        {/* content */}
        <div className="relative z-10 p-6 flex flex-col h-full">
          {/* top row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 border border-white/10 flex items-center justify-center overflow-hidden">
                <img
                  className="w-6 h-6 object-contain"
                  src={item.icon}
                  alt={item.title}
                />
              </div>

              <div className=" text-xs tracking-[0.25em] uppercase">
                Feature
              </div>
            </div>

            <div className="h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white transition">
              <div className="w-5 h-5">
                <ArrowRightIcon
                  style={{
                    fontSize: "4px !important",
                  }}
                />
              </div>
            </div>
          </div>

          {/* title */}
          <h3 className="mt-5 text-gray-300 text-xl font-semibold tracking-wide">
            {item.title}
          </h3>

          {/* description */}
          <p className="mt-2 text-gray-300 text-sm leading-relaxed tracking-wide">
            {item.dec}
          </p>

          {/* bottom accent */}
          <div className="mt-auto pt-5 flex items-center justify-between">
            <span className="text-white/50 text-xs tracking-[0.18em] uppercase">
              Explore
            </span>
            <div className="h-[2px] w-16 bg-white/10 overflow-hidden rounded">
              <div className="h-full w-0 group-hover:w-full transition-all duration-500 bg-white/40" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Cards = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 px-6 py-4">
        {data?.map((item, idx) => (
          <FancyCard key={idx} item={item} idx={idx} />
        ))}
      </section>
    </motion.div>
  );
};

export default Cards;
