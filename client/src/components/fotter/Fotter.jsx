import React from "react";
import { motion } from "framer-motion";
const Fotter = () => {
  return (
    <div>
      {" "}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-4 left-[45%] sm:flex hidden text-black"
      >
        <p className="border p-2 rounded-full bg-[black] text-white font-semibold text-xs">
          &copy; {new Date().getUTCFullYear().toString()} Claim Wolf. All rights
          reserved.
        </p>
      </motion.footer>
    </div>
  );
};

export default Fotter;
