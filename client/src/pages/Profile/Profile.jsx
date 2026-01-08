import React, { useEffect, useState } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { jwtDecode } from "jwt-decode";
import { hover, motion } from "framer-motion";
import profileImage from "/images/profile.png";
import { CameraOutlined } from "@ant-design/icons";

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setUserData(decoded);
    console.log(decoded);
  }, []);

  return (
    <>
      <p className="text-sm text-gray-500 py-4 font-semibold mt-10">
        Manage your profile and account settings
      </p>
      <div className="flex max-lg:flex max-lg:flex-wrap justify-between max-lg:gap-y-10">
        <section className="border border-gray-400 rounded-xl min-h-[30vh] xl:min-w-[45vh] md:min-w-[30vh] max-lg:w-[100%] max-lg:mr-4">
          <div
          // bg-[#68b3d8]/30
            className="bg-[#000]/70 border border-gray-400
              rounded-t-xl flex justify-center items-center min-h-[30vh] "
          >
            {/* bg-blue-800/40 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, scale: [0, 0.8, 1, 1] }}
              transition={{ duration: 0.4 }}
              className="m-[auto] rounded-full border-4 w-fit my-6 relative"
            >
              {/* <img
                src="https://i.pravatar.cc/300"
                className="rounded-full object-contain max-w-56 max-h-56"
              /> */}
              <img
                src={profileImage}
                className="rounded-full object-contain max-w-56 max-h-56"
              />
            <div className="absolute -right-4 top-24 text-black/60 hover:black/80 bg-white hover:bg-gray-200 p-2 rounded-full cursor-pointer border border-gray-300 shadow-lg shadow-black/20">
              <CameraOutlined style={{ fontSize: "2.1rem" }} />
            </div>
            </motion.div>
          </div>
          {/* User Profile Info */}
          <div className="flex flex-col my-20 gap-8 mx-4 box-border text-gray-500">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl flex justify-between w-full gap-6 border-b border-black/80"
            >
              <h1 className="text-sm">Your Name</h1>
              <h1 className="text-sm">{userData?.name}</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl flex justify-between w-full border-b border-black/80"
            >
              <h1 className="text-sm">Your Email</h1>
              <h1 className="text-sm">{userData?.email}</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl flex justify-between w-full gap-6 border-b border-black/80"
            >
              <h1 className="text-sm">Your Role</h1>
              <h1 className="text-sm">
                {userData?.role === 1 ? (
                  <p>Admin</p>
                ) : userData?.role === 0 ? (
                  <p>User</p>
                ) : (
                  <p>Approver</p>
                )}
              </h1>
            </motion.div>
          </div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <ResetPasswordForm userData={userData} />
        </motion.section>
      </div>
    </>
  );
};

export default Profile;
