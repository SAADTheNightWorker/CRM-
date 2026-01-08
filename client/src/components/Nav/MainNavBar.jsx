import React from "react";
import {
  BellOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuItem } from "@mui/material";
import { Avatar, Tag, Tooltip } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";

import { styled, alpha } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Notifcation from "./Notifcation";
import { useTheme } from "../Theme/context/ThemeContext";

const MainNavBar = ({ userType, userName, userProfile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNotifcation, setOpenNotifcation] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div className="h-14 border-b flex justify-between items-center topNavBg">
      {/* Right */}
      <div>
        <img
          src={"images/crm1.png"}
          alt="Logo"
          className="h-20 translate-y-2 w-24 pb-4 ml-4 object-cover"
        />
      </div>
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer  rounded-full px-2 py-1">
          <BellOutlined
            onClick={() => setOpenNotifcation(!openNotifcation)}
            style={{ fontSize: "20px", color: "gray" }}
            className=""
          />
          <p className="h-2 w-2 rounded-full bg-red-500 absolute top-0 right-0"></p>
          {openNotifcation && (
            <Notifcation className="absolute top-8 -left-[32vh]" />
          )}
        </div>
        <div
          onClick={toggleTheme}
          className="cursor-pointer  rounded-full px-2 py-1"
        >
          {theme === "light" ? (
            <div>
              <MoonOutlined
                style={{ fontSize: "20px", color: "gray" }}
                className=""
              />
            </div>
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <SunOutlined
                style={{ fontSize: "20px", color: "gray" }}
                className=""
              />
            </motion.div>
          )}
        </div>

        <div className="mr-4 flex items-cente border px-1 rounded-full">
          <Tooltip
            title="Your Profile"
            className="flex justify-center items-center cursor-pointer"
          >
            <Button
              className="h-10 !w-full !rounded-full py-1 flex justify-center items-center"
              id="demo-customized-button"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Avatar
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-[36px] h-[34px] object-cover"
              />
              <div className="text-sm text-gray-500 font-medium flex flex-col items-center justify-center py-[3px]">
                <p>
                  {userName ? (
                    <p className="rounded-full border-none text-sm !font-semibold">
                      {" "}
                      {userName}
                    </p>
                  ) : (
                    <p>{userProfile.name}</p>
                  )}
                </p>
                <p className="text-xs font-normal">
                  {userType !== undefined && (
                    <span className="">
                      {userType === 1 ? (
                        "Admin"
                      ) : userType === 0 ? (
                        <Tag
                          className="rounded-full text-gray-500 border-none text-xs !font-semibold"
                          color=""
                        >
                          User
                        </Tag>
                      ) : (
                        <Tag
                          className="rounded-full text-gray-500 border-none text-xs !font-semibold"
                          color=""
                        >
                          Approver
                        </Tag>
                      )}
                    </span>
                  )}
                </p>
                {/* Display decoded name or default */}
              </div>
            </Button>
          </Tooltip>
          {/* Menu */}
          <div className="z-50">
            <Menu
              className="mt-2 ml-1 !rounded-full"
              id=""
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                className="!w-[15vh] !flex !justify-between !items-center !font-thine !rounded-lg hover:!bg-gray-100"
                onClick={() => {
                  handleClose();
                  navigate("/profile");
                }}
                disableRipple
              >
                Profile
                <UserOutlined />
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                className="!w-[15vh] !flex !justify-between !items-center !font-thine !rounded-lg hover:!bg-gray-100"
                onClick={handleClose}
                disableRipple
              >
                Settings
                <SettingOutlined />
              </MenuItem>
            </Menu>
          </div>
          {/* Menu END */}
        </div>
      </div>
    </div>
  );
};

export default MainNavBar;
