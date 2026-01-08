import React from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "./context/ThemeContext";
import { motion } from "framer-motion";

const ThemeSection = () => {
  // Use the theme and toggleTheme from the context
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ scale: [0.2, 0.4, 0.6, 0.8, 1] }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.3 }}
      transition={{ duration: 0.2 }}
      className="flex hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer mt-3"
      onClick={toggleTheme} // Toggle theme when clicked
    >
      {theme === "dark" ? (
        <MoonOutlined style={{ fontSize: 22, objectFit: "contain" }} />
      ) : (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <SunOutlined style={{ fontSize: 22, objectFit: "contain" }} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ThemeSection;
