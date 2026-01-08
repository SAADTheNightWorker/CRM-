// import React, { useEffect, useRef, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import Navbar from "./Navbar/Navbar";
// import BackButton from "./Backbutton/BackButton";
// import { motion } from "framer-motion";
// import MainNavBar from "./Nav/MainNavBar";
// import Sidebar from "./Navbar/Sidebar";

// const PrivateRoute = ({ isAuthenticated, userType, userName, children }) => {
//   const { pathname } = useLocation();
//   const userProfile = {
//     name: "John Doe",
//     avatar: "/images/profile.png",
//   };
//   return isAuthenticated ? (
//     <>
//       <div
//         className={`${pathname === "/" ? "flex-none overflow-hidden" : "flex-none overflow-hidden"}`}
//       >
//         {pathname !== "/login" && (
//           <div className="sticky">
//             <MainNavBar
//               userProfile={userProfile}
//               userName={userName}
//               userType={userType}
//             />
//           </div>
//         )}

//         {pathname !== "/login" && (
//           <div className="flex gap-4 min-h-[calc(100vh-6vh)] justify-start">
//             <div className={`w-full min-w-[20rem] sticky top-14 h-[calc(100vh-6vh)] hidden md:block`}>
//               <Sidebar />
//             </div>
//             <div className={"flex flex-col w-full justify-center"}>
//               <div
//                 className={`flex justify-between mx-10 items-center flex-wrap !important bg-transparent ${pathname === "/" ? "" : ""} `}
//               >
//                 {(pathname === "/client" ||
//                   pathname === "/broker" ||
//                   pathname === "/company" ||
//                   pathname === "/vendor" ||
//                   pathname === "/category" ||
//                   pathname === "/payment" ||
//                   pathname === "/agent") && (
//                   <div className="p-4 mt-4">
//                     <BackButton />
//                   </div>
//                 )}
//                 {pathname !== "/" && pathname !== "/login" && (
//                   <motion.div
//                     className={`text-xl font-semibold text-gray-500 tracking-widest text-right
//                        max-sm:flex max-sm:justify-center max-sm:items-center max-sm:w-full p-3 mt-4 bg-[#edf4fb] m-2 rounded-full`}
//                   >
//                     {pathname.toString().slice(1).toUpperCase()}{" "}
//                     <span className=" font-thin">Section</span>
//                   </motion.div>
//                 )}
//               </div>
//               {children}
//             </div>
//           </div>
//         )}

//         {/* {pathname === "/Home" && (
//         <section className="">
//           <SideBar />
//         </section>
//       )} */}
//       </div>
//     </>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default PrivateRoute;
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import MainNavBar from "./Nav/MainNavBar";
import Sidebar from "./Navbar/Sidebar";
import BackButton from "./Backbutton/BackButton";

const NAVBAR_HEIGHT = 56; // tailwind top-14 = 56px

const PrivateRoute = ({ isAuthenticated, userType, userName, children }) => {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const userProfile = {
    name: "John Doe",
    avatar: "/images/profile.png",
  };

  const isLogin = pathname === "/login";
  const isHome = pathname === "/";

  const showHeaderBar = !isLogin;
  const showShell = !isLogin;

  const showBackButton = [
    "/client",
    "/broker",
    "/company",
    "/vendor",
    "/category",
    "/payment",
    "/agent",
  ].includes(pathname);

  const showSectionPill = !isHome && !isLogin;

  const sectionTitle = pathname
    .replace("/", "")
    .replaceAll("-", " ")
    .toUpperCase();

  if (!isAuthenticated && !token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      {showHeaderBar && (
        <div className="sticky top-0 z-50">
          <MainNavBar
            userProfile={userProfile}
            userName={userName}
            userType={userType}
          />
        </div>
      )}

      {/* SHELL */}
      {showShell && (
        <div className="flex-1 flex min-h-0">
          {/* SIDEBAR */}
          <aside
            className="
               shrink-0
              sticky top-14
              h-[calc(100vh-56px)]
              overflow-y-hidden
              border-r
              overflow-x-hidden
            "
          >
            <Sidebar userType={userType} />
          </aside>

          {/* CONTENT */}
          <main className="flex-1 min-w-0 min-h-0 overflow-y-auto">
            {/* TOP STRIP (back button + section pill) */}
            {showBackButton && (
              <div className="py-2 mx-6">
                <BackButton />
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-10 pt-4">
              {showSectionPill && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="
                    text-xl font-semibold textTitle tracking-widest text-right
                  "
                >
                  <div className="flex flex-col justify-start items-start">
                    <p>
                      {sectionTitle} <span className="font-thin">Section</span>
                    </p>
                    <p className="text-sm">
                      View And Manage {sectionTitle}{" "}
                      <span className="font-thin">Section</span>
                    </p>
                  </div>
                </motion.div>
              )}
              {isHome && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="

                    text-xl font-semibold textTitle tracking-widest text-right
                  "
                >
                  <div className="flex flex-col justify-start items-start">
                    <p>
                      Home <span className="font-thin">Section</span>
                    </p>
                    <p className="text-sm">
                      View And Manage Home{" "}
                      <span className="font-thin">Section</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* PAGE BODY */}
            <div className="px-4 md:px-10 py-4">{children}</div>
          </main>
        </div>
      )}
    </div>
  );
};

export default PrivateRoute;
