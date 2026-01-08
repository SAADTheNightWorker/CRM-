import React, { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logg from "../../../public/images/claimpng.png";

const Login = ({ setIsAuthenticated }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // Define variants for the sentence and letters
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  // useEffect(() => {
  //   if (token?.length > 0) {
  //     localStorage.removeItem("token");
  //     window.location.reload();
  //   }
  // }, [token]);

  const TypewriterText = ({ text }) => (
    <motion.h1
      variants={sentenceVariants}
      initial="hidden"
      animate="visible"
      className="lg:text-4xl font-medium md:text-2xl translate-y-0 max-sm:translate-y-0 max-sm:text-xl"
    >
      {text.split("").map((char, index) => (
        <motion.span key={char + "-" + index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2 mx-4 ">
      <div className=" flex-center flex-col">
        <motion.div
          initial={{ opacity: 0, scale: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-center items-center mb-4 text-3xl p-4 rounded-xl"
        >
          <img className="h-40 rounded-xl" src={logg} />
        </motion.div>
        <div className="flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl"
          >
            Claim Wolf Group
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Your story Our passion
          </motion.p>
        </div>

        <div className="flex justify-center items-center w-full">
          <AuthForm setIsAuthenticated={setIsAuthenticated} />
        </div>
      </div>
      {/* <p className="text-white absolute bottom-6 max-sm:relative m-[auto] max-sm:bottom-0 max-sm:py-4 text-center w-full">
          <footer className="pt-10 max-sm:pt-0 text-xs flex justify-center items-center pr-6 gap-2">
            Copyright (&copy;){" "}
            <Link className="text-blue-400" to="#">
              Global Technology
            </Link>{" "}
            {new Date().getFullYear()}
          </footer>
        </p> */}
    </div>
  );
};

export default Login;
