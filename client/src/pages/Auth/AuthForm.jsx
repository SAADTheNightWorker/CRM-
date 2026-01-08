import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { resetPassword, userLogin } from "../../../store/actionApis/userApi";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const AuthForm = ({ setIsAuthenticated }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const [resetBtnDisabled, setResetBtnDisabled] = useState(false);
  const [forgot, setForgot] = useState(false);

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const dispatch = useDispatch();
  // Form submission
  const loginUser = async (values) => {
    setLoginBtnDisabled(true);

    try {
      const res = await dispatch(userLogin(values));
      console.log("Login Response:", res);

      const isSuccess = res?.meta?.requestStatus === "fulfilled";
      const userData = res?.payload?.user || {};
      const token = res?.payload?.token || null;
      const errorMessage =
        res?.payload?.data?.message || "Login failed Please try again.";

      if (isSuccess) {
        setIsAuthenticated(true);
        notification.success({
          message: "Login Successfully!",
          description: `Welcome back, ${userData?.name || "User"}!`,
          placement: "topRight",
          icon: <CheckOutlined style={{ color: "#52c41a" }} />,
        });

        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
          // window.location.reload();
        }
      } else {
        console.error("Login failed response:", res?.payload); // Debugging error response
        notification.error({
          message: "Login Failed!",
          description: errorMessage,
          placement: "topRight",
          icon: <CloseOutlined style={{ color: "red" }} />,
        });
      }
    } catch (error) {
      console.error("Error >>>", error);

      let errorMsg = "Something went wrong. Please try again.";

      if (error.response) {
        // If API responds with an error message, display it
        errorMsg = error.response.data?.message || errorMsg;
        console.error("API Error Response:", error.response.data); // Debug API error response
      } else if (error.message) {
        // If there's a network error or other issue
        errorMsg = error.message;
      }

      notification.error({
        message: "Login Error",
        description: errorMsg,
        placement: "topRight",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    } finally {
      setLoginBtnDisabled(false);
    }
  };

  const ResetPassword = async (value) => {
    setResetBtnDisabled(true);
    try {
      const res = await dispatch(resetPassword(value)); // Ensure resetPassword is an async function
      notification.success({
        message: "Email Sent",
        description: "Please check your email to reset your password",
        placement: "topRight",
        icon: <CheckOutlined style={{ color: "#52c41a" }} />,
      });
      return res;
    } catch (error) {
      console.error("Reset Password Error:", error);
      notification.error({
        message: "Error",
        description: "Something went wrong, please try again",
        placement: "topRight",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
      throw error; // Re-throw for potential further handling
    } finally {
      setResetBtnDisabled(false);
      setForgot(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center"
    >
      <section className="p-8">
        {forgot ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2 mb-4 cursor-none touch-none"
            >
              {/* <img src={logg} alt="Snapgram Logo" className="h-8" /> */}
              <div className="flex flex-col justify-start gap-2 ">
                <p className="text-3xl font-bold text-primary-600 ">
                  Reset Password
                </p>
                <p className="text-xs font-thine text-primary-600 ">
                  Enter your email address to reset your password!
                </p>
              </div>
            </motion.div>
            <Form name="signinForm" onFinish={ResetPassword} className="mt-4">
              {/* Email Field */}

              <Form.Item
                className="pt-10"
                name="email"
                rules={[{ type: "email" }, { required: true }]}
                required
              >
                <div className="floating-input floating-input-active">
                  <label className="font-semibold text-gray-400">
                    Email Address
                  </label>
                  <Input
                    placeholder="Your Email"
                    className=" h-[45px] border rounded-lg"
                  />
                </div>
              </Form.Item>
              <section className="flex w-full mt-6 justify-between items-center gap-6">
                <p className="flex flex-col justify-start text-lg text-gray-700 flex-wrap text-start">
                  <div className="flex gap-4 items-center">
                    <div className="">
                      <p>Reset Password</p>
                      <p className="font-thine text-sm text-gray-500 font-sans cursor-pointer">
                        your Account email address to reset password
                      </p>
                    </div>
                    {/* Forgot Password Link */}
                    <Link
                      onClick={() => setForgot(false)}
                      className="text-black hover:text-black/70 text-sm font-thine mt-20"
                    >
                      Back to Sign In!
                    </Link>
                  </div>
                </p>

                {/* Login Button */}
              </section>

              <Form.Item>
                <Button
                  htmlType="submit"
                  disabled={resetBtnDisabled}
                  className="w-full mt-4 p-5 bg-black/80 text-white hover:bg-black/60 font-bold"
                >
                  {resetBtnDisabled ? "Sending Email ..." : "Reset"}
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            {/* <div className="text-white text-center text-3xl font-medium tracking-wide font-sans border rounded-lg p-2 bg-[#d3b8e9]">
              Sign In
            </div> */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2 mb-4 cursor-none touch-none"
            >
              {/* <img src={logg} alt="Snapgram Logo" className="h-8" /> */}
              <div className="flex flex-col justify-start gap-2">
                <p className="text-3xl font-bold">Sign In</p>
                <p className="text-xs font-thine">
                  Enter your email and password to sign in!
                </p>
              </div>
            </motion.div>
            <Form name="signinForm" onFinish={loginUser} className="mt-4">
              {/* Email Field */}

              <Form.Item
                className=""
                name="email"
                rules={[{ type: "email" }, { required: true }]}
                required
              >
                <div className="">
                  <label className="font-bold text-xs text-gray-400">
                    Email
                  </label>
                  <Input
                    placeholder="Your Email"
                    className=" h-[45px] border rounded-lg"
                  />
                </div>
              </Form.Item>

              {/* Custom Password Field */}
              <Form.Item name="password" rules={[{ required: true }]} required>
                <div className="relative mt-4">
                  <label className="font-bold text-xs text-gray-400">
                    Password
                  </label>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Your Password"
                    className="p-3 h-[45px] border rounded-lg"
                  />
                  {/* Toggle button to show/hide password */}
                  <Button
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-7 bg-transparent border-none cursor-pointer"
                    icon={
                      passwordVisible ? (
                        <EyeTwoTone />
                      ) : (
                        <EyeInvisibleOutlined />
                      )
                    }
                  />
                </div>
              </Form.Item>

              <section className="flex w-full mt-6 justify-between items-center gap-6">
                <p className="flex flex-col justify-start text-lg text-gray-400 gap-2 flex-wrap text-start">
                  <div className="flex gap-4 items-center">
                    <div className="">
                      <p> Sign In</p>
                      <p className="font-thine text-sm text-gray-400 font-sans cursor-pointer">
                        Your Account with Email and Password
                      </p>
                    </div>
                    {/* Forgot Password Link */}
                    <Link
                      onClick={() => setForgot(true)}
                      className="text-gray-500 hover:text-gray-400 text-sm font-thine mt-20"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </p>
                {/* Login Button */}
              </section>
              <Form.Item>
                <Button
                  type="btn"
                  htmlType="submit"
                  disabled={loginBtnDisabled}
                  className="w-full mt-4 p-5 bg-black/80 text-white hover:bg-black/60 font-bold"
                >
                  {loginBtnDisabled ? "Please Wait ..." : "Sign in"}
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </section>
    </motion.div>
  );
};

export default AuthForm;
