import WordListSwap from "./WordListSwap";
import { LayoutGroup, motion } from "framer-motion";

export const RevenueChart = ({texts}) => {
  return (
    <LayoutGroup>
      <motion.div
        layout
        className="flex flex-wrap items-center justify-center text-center text-3xl sm:text-5xl md:text-6xl font-extrabold py-10 px-4 bg-gradient-to-r from-indigo-100 via-purple-50 to-blue-100 rounded-xl shadow-md"
      >
        <motion.span
          layout
          className="text-gray-700"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        >
          ClaimWolf CRM &nbsp;
        </motion.span>
        <WordListSwap
          texts={texts}
          mainClassName="text-white bg-violet-600 px-4 py-2 sm:px-6 sm:py-3 rounded-lg mx-2 shadow-lg"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </motion.div>
    </LayoutGroup>
  );
};

export default RevenueChart;
