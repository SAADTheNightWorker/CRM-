import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackButton = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: -30 }} // Start from slightly above
        animate={{ opacity: 1, y: 0 }} // Fade in smoothly
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
        className="flex justify-start items-center px-8 border rounded-full w-fit p-2"
      >
        <Link to="/administrator" className="flex items-center">
          {/* Animated Arrow with Cool Hover Effect */}
          <motion.div
            whileHover={{ scale: 1.2, x: -5 }} // Slightly moves left & scales up
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeftOutlined
              style={{ fontSize: "20px", color: "#08c" }}
              className="hover:text-blue-600 duration-200"
            />
          </motion.div>

          {/* Animated Text with Cool Hover Effect */}
          <motion.p
            className="text-gray-500 ml-2"
            whileHover={{ x: -2, color: "#3B82F6" }} // Moves left & changes color
            transition={{ duration: 0.3 }}
          >
            Back
          </motion.p>
        </Link>
      </motion.div>
    </section>
  );
};

export default BackButton;
