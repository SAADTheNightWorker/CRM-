import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { jwtDecode } from "jwt-decode";
import Logo from "/images/crm1.png"; // Correctly importing the logo from the public folder

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [adminOpen, setAdminOpen] = useState(false);
  const [userType, setUserType] = useState(1);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // const handleAdminToggle = () => setAdminOpen(!adminOpen);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const menuRef = useRef(null);

  const handleAdminToggle = () => {
    setAdminOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is outside, close the menu
      if (
        adminOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setAdminOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [adminOpen]);

  const location = useLocation();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserType(decoded?.role);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserType(null);
      }
    } else {
      setUserType(null);
    }
  }, [token]);

  // Navigation list based on user type
  const navList =
    {
      1: [
        { name: "Home", link: "/" },
        { name: "Policy Record", link: "/policy_records" },
        { name: "Expense Record", link: "/expence_record" },
        { name: "Revenue Record", link: "/revneue_record" },
        { name: "Approve Fleet Record", link: "/Approve_Fleet_Record" },
        {
          name: "Administration",
          link: "",
          subMenu: [
            { name: "Client", link: "/client" },
            { name: "Company", link: "/company" },
            { name: "Broker", link: "/broker" },
            { name: "Agent", link: "/agent" },
            { name: "Vendor", link: "/vendor" },
            { name: "Category", link: "/category" },
            { name: "Payment Method", link: "/payment" },
          ],
        },
      ],
      0: [
        { name: "Home", link: "/" },
        { name: "Policy Record", link: "/policy_records" },
        { name: "Expense Record", link: "/expence_record" },
        { name: "Revenue Record", link: "/revneue_record" },
        { name: "Fleet Record", link: "/sale" },
      ],
      2: [
        { name: "Home", link: "/" },
        { name: "Expense Record", link: "/expence_record" },
        { name: "Approve Expence Record", link: "/approve_expence_record" },
      ],
    }[userType] || [];

  return (
    <AppBar position="fixed" sx={{ background: "white" }}>
      <Toolbar className="flex h-10 justify-between items-center w-full border-b-[1px] border-gray-200">
        {/* Logo */}
        <Link to="/">
          <Tooltip title="Back to Home">
            <motion.img
              src={Logo}
              alt="logo"
              className="w-[8vh]"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </Tooltip>
        </Link>

        {/* Mobile Navigation */}
        {isMobile ? (
          <>
            <IconButton edge="end" color="" onClick={handleDrawerToggle}>
              <MenuIcon style={{
                color: "gray"
              }}/>
            </IconButton>
            <Drawer
              anchor="top"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{
                "& .MuiDrawer-paper": {
                  height: "80vh",
                  background: "#edf4fb",
                  color: "gray",
                  textAlign: "center",
                  margin: "40px",
                  marginTop: "80px",
                  borderRadius: "20px",
                },
              }}
            >
              <div className="flex justify-between items-center">
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{ position: "absolute", right: 20, color: "gray" }}
                >
                  <CloseIcon />
                </IconButton>

                <Link to="/">
                  <Tooltip title="Back to Home">
                    <motion.img
                      src={Logo}
                      alt="logo"
                      className="w-[8vh]"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Tooltip>
                </Link>
              </div>

              <List className="border-t">
                {navList.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.subMenu ? (
                      <>
                        <ListItem button onClick={handleAdminToggle}>
                          <ListItemText
                            primary={item.name}
                            className={`${adminOpen ? "bg-[#edf4fb] text-blue-600" : "text-gray-500"} text-2xl font-bold hover:bg-white/10 p-2 rounded-lg duration-100 cursor-pointer`}
                          />
                          {adminOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItem>
                        <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                          <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-[#] mx-4 rounded-md duration-100"
                          >
                            <List component="div" disablePadding>
                              {item.subMenu.map((subItem, subIndex) => (
                                <ListItem
                                  button
                                  component={Link}
                                  to={subItem.link}
                                  key={subIndex}
                                  onClick={handleDrawerToggle}
                                >
                                  <ListItemText
                                    primary={
                                      location.pathname === subItem.link
                                        ? `${subItem.name}`
                                        : subItem.name
                                    }
                                    className={`${location.pathname === subItem.link ? "text-blue-400 bg-[#81b4e84e] shadow-md" : "text-gray-500"} text-2xl font-bold hover:bg-white/10 p-2 rounded-lg duration-100`}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </motion.div>
                        </Collapse>
                      </>
                    ) : (
                      <ListItem
                        button
                        component={Link}
                        to={item.link}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemText
                          onClick={handleAdminToggle}
                          primary={
                            location.pathname === item.link
                              ? `${item.name}`
                              : item.name
                          }
                          className={`${location.pathname === item.link ? "text-blue-400 bg-white/20 border shadow-md" : "text-gray-500"} font-semibold hover:bg-white/10 p-2 rounded-lg duration-100`}
                        />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          // Desktop Navigation
          <motion.div
            className="flex gap-6 mr-10 justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {navList.map((item, index) => (
              <React.Fragment key={index}>
                {item.subMenu ? (
                  <List className="relative">
                    <ListItem
                      button
                      onMouseEnter={handleAdminToggle}
                      ref={menuRef}
                    >
                      <div
                        className={`${adminOpen ? `text-blue-400 bg-[#edf4fb]` : `text-gray-500`} text-2xl font-bold p-2 rounded-lg duration-100 flex items-center cursor-pointer`}
                      >
                        <p>{item.name}</p>
                        {adminOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </div>
                    </ListItem>
                    <Collapse
                      in={adminOpen}
                      timeout="auto"
                      unmountOnExit
                      className="absolute z-20 flex min-w-[22vh] ml-2"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`"text-blue-400 bg-[#edf4fb] shadow-xl shadow-gray-500" : rounded-md duration-100 pr-1`}
                      >
                        <List component="div" disablePadding>
                          {item.subMenu.map((subItem, subIndex) => (
                            <ListItem
                              onClick={handleAdminToggle}
                              button
                              component={Link}
                              to={subItem.link}
                              key={subIndex}
                            >
                              <ListItemText
                                primary={subItem.name}
                                className={`${
                                  location.pathname === subItem.link
                                    ? `text-blue-400 bg-gray-400/20`
                                    : `text-blue-400`
                                } text-2xl font-bold p-2 rounded-lg duration-100`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </motion.div>
                    </Collapse>
                  </List>
                ) : (
                  <Typography
                    variant="body2"
                    component={Link}
                    to={item.link}
                    className={`${location.pathname === item.link ? `text-blue-400 bg-[#edf4fb]` : `text-gray-500 hover:text-blue-400 hover:bg-[#edf4fb]`} tracking-wider font-bold px-2 py-2 rounded-lg duration-200`}
                  >
                    {item.name}
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
