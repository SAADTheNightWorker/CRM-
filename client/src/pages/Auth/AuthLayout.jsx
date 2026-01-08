import React from "react";
import { Outlet, Navigate, useLocation, Link } from "react-router-dom";
// import video from "../../public/videos/video1.mp4"; // Adjust the path as necessary
// import ThemeSection from "../components/theme/ThemeSection";
import { Tooltip } from "antd";
// import FooterTitle from "../components/footer/FooterTitle";
import { motion } from "framer-motion";
import Pic from "../../../public/images/crm1.png";
import ThemeSection from "../../components/Theme/ThemeSection";
import SpotlightPanel from "../../components/Theme/SpotlightPanel";
import FooterTitle from "./FooterTitle";
import FlipClock from "./FlipDigit";

const AuthLayout = () => {
  // Replace this with actual authentication logic (e.g., context or localStorage check)
  const isAuthenticated = false;
  const location = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <div className="flex flex-row h-screen relative ">
          {/* Video background */}
          {/* <video
            src={video}
            autoPlay
            loop
            muted
            type="video/mp4"
            alt="Auth Illustration"
            preload="auto"
            playsInline
            className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
          /> */}
          <div className="flex-1 max-md:hidden">
            <SpotlightPanel className="h-screen">
              <div className="relative flex flex-col max-xl:justify-start justify-center h-full px-10">
                <motion.div
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={Pic}
                    className="w-[10rem] h-[8rem] object-contain"
                    alt="Logo"
                  />
                </motion.div>
                <div className="flex flex-col lg:justify-start justify-center max-xl:text-center xl:mt-0 mt-20 gap-4 p-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl"
                  >
                    CRM Where Relationships Turn Into Revenue
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-lg font-thin">
                      A powerful CRM built to manage customers, policies, and
                      business operations in one place.
                    </p>
                    <p className="text-lg font-thin leading-relaxed">
                      Track revenue, monitor expenses, maintain policy records,
                      and gain real time <br /> insights that help you make
                      smarter decisions every day.
                    </p>
                    <p className="text-md font-thin leading-relaxed">
                      {" "}
                      Organize better. Sell smarter. Grow faster.
                    </p>
                  </motion.div>
                </div>
                <div className="xl:flex hidden">
                  <FlipClock />
                </div>
              </div>
            </SpotlightPanel>
          </div>

          {/* Theme Section with Tooltip */}
          <Tooltip title="Toggle Theme" placement="left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-2 right-4"
            >
              <ThemeSection />
            </motion.div>
          </Tooltip>
          {/* Sign in or Sign up Sections */}
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 justify-center items-center flex-col py-10 "
          >
            <Outlet />
            {/* <p className="text-light-3 small-medium md:base-regular my-2">
              {location.pathname.includes("sign-up")
                ? "Already have an account?"
                : "Don't have an account?"}
              {location.pathname.includes("sign-up") ? (
                <Link
                  to="/sign-in"
                  className="text-primary-600 hover:underline"
                >
                  {""} Sign In
                </Link>
              ) : (
                <Link
                  to="/sign-up"
                  className="text-primary-600 hover:underline"
                >
                  {""} Sign Up
                </Link>
              )}
            </p> */}
            <FooterTitle />
          </motion.section>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
