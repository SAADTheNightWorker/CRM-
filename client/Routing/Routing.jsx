import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../src/components/PrivateRoute";
import Home from "../src/pages/Home";
import Login from "../src/pages/Auth/Login";
import { motion } from "framer-motion";
import Administrator from "../src/pages/adminstrator/AdministratorMain";
import Client from "../src/pages/adminstrator/pages/clients";
import Company from "../src/pages/adminstrator/pages/Company";
import Broker from "../src/pages/adminstrator/pages/Broker";
import Agents from "../src/pages/adminstrator/pages/Agents";
import Vendor from "../src/pages/adminstrator/pages/Vendor";
import Category from "../src/pages/adminstrator/pages/Category";
import Payment from "../src/pages/adminstrator/pages/Payment";
import User from "../src/pages/adminstrator/pages/User";
import { jwtDecode } from "jwt-decode";
import PolicyRecords from "../src/pages/PolicyRecords";
import RevneueRecord from "../src/pages/RevneueRecord";
import ExpenceRecoed from "../src/pages/ExpenceRecoed";
import ApproveExpenceRecords from "../src/pages/ApproveExpenceRecords";
import Sales from "../src/pages/Sales";
import SalesApproval from "../src/pages/SalesApproval";
import SignOut from "../src/pages/Auth/SignOut";
import Profile from "../src/pages/Profile/Profile";
import AuthLayout from "../src/pages/Auth/AuthLayout";
import PolicyChart from "../src/components/Charts/PolicyChart";
import BiChart from "../src/components/Charts/BiChart";

const Routing = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState();
  // Effect to decode token and update user state

  useEffect(() => {
    setInterval(() => {
      setToken(localStorage.getItem("token"));
    });

    clearInterval();
  }, [token]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUserType(decoded?.role);
        setUserName(decoded?.name);
        setIsAuthenticated(true);
        //  console.log(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
        setUserType(null);
        setUserName(null);
        localStorage.removeItem("token"); // Remove invalid token
      }
    } else {
      setIsAuthenticated(false);
      setUserType(null);
      setUserName(null);
    }
  }, [token]);

  // Listen for localStorage changes (handles token updates from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      setIsAuthenticated(!!newToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <div>
      <div className="">
        {" "}
        {userType === 0 ? (
          <>
            <BrowserRouter>
              <Routes>
                <Route element={<AuthLayout />}>
                  <Route
                    path="/login"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/" replace />
                      ) : (
                        <Login setIsAuthenticated={setIsAuthenticated} />
                      )
                    }
                  />
                </Route>
                <Route
                  path="/"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Home userType={userType} userName={userName} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/policy_records"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <PolicyRecords />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/policies_dashboard"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <PolicyChart />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/expence_record"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <ExpenceRecoed />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/revneue_record"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <RevneueRecord />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/fleet_Reocrd"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Sales />
                    </PrivateRoute>
                  }
                />
                <Route path="/signOut" element={<SignOut />} />
                {/* <Route path="/*" element={<PageNotFound />} /> */}
              </Routes>
            </BrowserRouter>
          </>
        ) : userType === 1 ? (
          <>
            <BrowserRouter>
              <Routes>
                <Route element={<AuthLayout />}>
                  <Route
                    path="/login"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/" replace />
                      ) : (
                        <Login setIsAuthenticated={setIsAuthenticated} />
                      )
                    }
                  />
                </Route>
                <Route
                  path="/"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Home userType={userType} userName={userName} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bi_dashboard"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <BiChart userType={userType} userName={userName} />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Profile userType={userType} userName={userName} />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/administrator"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Administrator />
                    </PrivateRoute>
                  }
                />

                {/* adminstrator Routes */}
                <Route
                  path="/client"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Client />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/company"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Company />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/broker"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Broker />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/agent"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Agents />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/vendor"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Vendor />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/category"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Category />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Payment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <User />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/policy_records"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <PolicyRecords />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/policies_dashboard"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <PolicyChart />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/expence_record"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <ExpenceRecoed />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/revneue_record"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <RevneueRecord />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Approve_Fleet_Record"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <SalesApproval />
                    </PrivateRoute>
                  }
                />
                <Route path="/signOut" element={<SignOut />} />
                {/* <Route path="/*" element={<PageNotFound />} /> */}
              </Routes>
            </BrowserRouter>
          </>
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route element={<AuthLayout />}>
                  <Route
                    path="/login"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/" replace />
                      ) : (
                        <Login setIsAuthenticated={setIsAuthenticated} />
                      )
                    }
                  />
                </Route>
                <Route
                  path="/"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <Home userType={userType} userName={userName} />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/expence_record"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <ExpenceRecoed />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/approve_expence_record"
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                      userName={userName}
                    >
                      <ApproveExpenceRecords />
                    </PrivateRoute>
                  }
                />
                <Route path="/signOut" element={<SignOut />} />
                {/* <Route path="/*" element={<PageNotFound />} /> */}
              </Routes>
            </BrowserRouter>
          </>
        )}
      </div>
    </div>
  );
};

export default Routing;

export const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-9xl font-bold text-gray-800 mb-4"
        >
          404
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-3xl font-semibold text-gray-700 mb-6"
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-lg text-gray-600 mb-8"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <a
            href="/"
            className="inline-block bg-blue-600 text-black border px-6 py-3 mt-10 p-3 rounded-lg shadow-lg hover:bg-blue-700 hover:text-white transition duration-300"
          >
            Go Back to Dashboard
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
