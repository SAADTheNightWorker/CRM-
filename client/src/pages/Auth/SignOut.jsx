import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const SignOut = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  // const Signout = () => {
  //   try {
  //     if (token) {
  //       navigate("/login");
  //       localStorage.removeItem("token");

  //       notification.success({
  //         message: "You've signed out successfully",
  //         duration: 2,
  //         placement: "topRight",
  //         icon: <LockClosedIcon style={{ color: "green" }} />,
  //       });
  //     }
  //   } catch {
  //     notification.error({
  //       message: "Failed to sign out",
  //       duration: 2,
  //       placement: "topRight",
  //       icon: <UserIcon style={{ color: "red" }} />,
  //     });
  //   } finally {
  //     navigate("/login");
  //   }
  // };

  useEffect(() => {
    if (token.length > 0) {
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
        return;
        // window.location.reload();
      }, 2000);
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <CircularProgress size={60} />
      </div>
      <div className="text-center mt-5">Signing out...</div>
    </div>
  );
};

export default SignOut;
