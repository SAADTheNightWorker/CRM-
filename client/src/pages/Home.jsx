import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Cards from "../components/HomeCards/Cards";
import {
  BellAlertIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { BellOutlined, MoonOutlined, UserAddOutlined } from "@ant-design/icons";
import logo from "/images/crm1.png";
import { Stack } from "@mui/system";
import { Avatar, notification, Tag } from "antd";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import icon1 from "/images/audit2.png";
import user1 from "/images/add-group.png";
import policy1 from "/images/policy.png";
import expence1 from "/images/chart.png";
import inc1 from "/images/insurance.png";
import approve1 from "/images/approve.png";
import SignOut from "./Auth/SignOut";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useDispatch } from "react-redux";
import { getClient } from "../../store/actionApis/clientApi";
import Profile from "./Profile/Profile";
import ProfilePic from "/images/profile.png";
import fleetLogo from "/images/fleet.png";
import fleetApproveLogo from "/images/fleetApprove.png";
import PolicyChart from "../components/Charts/PolicyChart";
import RevneueChart from "../components/Charts/RevneueChart";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/Navbar/Sidebar";
import MainNavBar from "../components/Nav/MainNavBar";
// Mock data for the cards

const AddminstratorData = [
  {
    title: "Manage your clients",
    icon: icon1,
    link: "/client",
    dec: "you can add or Delete and also View clients",
  },
  {
    title: "Insurancr Company",
    icon: icon1,
    link: "/company",
    dec: "you can add or Delete and also View Insurancr Company",
  },
  {
    title: "Broker",
    icon: icon1,
    link: "/broker",
    dec: "you can add or Delete and also View Broker",
  },
  {
    title: "ClaimWolf Agents",
    icon: icon1,
    link: "/agent",
    dec: "you can add or Delete and also View ClaimWolf' Agents",
  },
  {
    title: "Vendor",
    icon: icon1,
    link: "/vendor",
    dec: "you can add or Delete and also View Vendor",
  },
  {
    title: "Category",
    icon: icon1,
    link: "/category",
    dec: "you can add or Delete and also View Category",
  },
  {
    title: "Payment Method",
    icon: icon1,
    link: "/payment",
    dec: "you can add or Delete and also View Payment Method",
  },
];
const demoTheme = extendTheme({
  colorSchemes: {
    light: true,
    //  dark: true
  },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#1976d2", // Default blue for light mode
        },
        background: {
          default: "#ffff",
          paper: "#ffffffb9",
        },
      },
    },
    // dark: {
    //   palette: {
    //     primary: {
    //       main: "#3473c8", // Darker blue for dark mode
    //     },
    //     background: {
    //       default: "#0A192F", // A deep blue background for dark mode
    //       paper: "#02051dbc",
    //     },
    //     // background: {
    //     //   default: "#0A192F", // A deep blue background for dark mode
    //     //   paper: "#102A43",
    //     // },
    //     text: {
    //       primary: "#BBDEFB", // Light blue text for contrast
    //       secondary: "#90CAF9",
    //     },
    //   },
    // },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getClient());
  }, [dispatch]);
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

// const Skeleton = styled("div")(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter("/home");
  console.log(router);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  React.useEffect(() => {
    // Remove the SVG logo
    const svgLogo = document.querySelector(
      "svg[fill='none'][xmlns='http://www.w3.org/2000/svg']"
    );
    if (svgLogo) {
      svgLogo.remove(); // Remove the SVG element
    }

    // Optionally, hide or remove other logos (e.g., default MUI logo)
    const defaultLogo = document.querySelector(
      ".MuiTypography-root.MuiTypography-h6"
    );
    if (defaultLogo) {
      defaultLogo.style.display = "none"; // Hide the default logo text
    }

    // Add your logo to the header
    const header = document.querySelector(".MuiToolbar-root"); // Target the header
    if (header) {
      // Check if the logo already exists to avoid duplication
      const existingLogo = header.querySelector("img[alt='Logo']");
      if (!existingLogo) {
        // Create an image element for your logo
        const logoElement = document.createElement("img");
        logoElement.src = logo; // Set the logo source (import your logo file)
        logoElement.alt = "Logo"; // Add alt text for accessibility
        logoElement.style.height = "60px"; // Adjust the height as needed
        logoElement.style.marginRight = "16px"; // Add spacing if needed

        // Append your logo to the header
        header.prepend(logoElement);
      }
    }

    // Cleanup function to remove the logo when the component unmounts
    return () => {
      const logoElement = header?.querySelector("img[alt='Logo']");
      if (logoElement) {
        logoElement.remove();
      }
    };
  }, []); // Empt

  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [userName, setUserName] = React.useState(null);
  const [userType, setUserType] = React.useState(null);
  // Effect to decode token
  // Decode token on mount
  React.useEffect(() => {
    //  console.log("Stored Token:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log("Decoded Token:", decoded);
        setUserType(decoded?.role);
        setUserName(decoded?.name);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserType(null);
        setUserName(null);
        localStorage.removeItem("token");
      }
    } else {
      setUserType(null);
      setUserName(null);
    }
  }, [token]);

  const CardData =
    userType === 1
      ? [
          {
            title: "Administrator",
            icon: icon1,
            link: "/administrator",
            dec: "Client Management System For Enterprise",
          },
          {
            title: "Policy Record",
            icon: policy1,
            link: "/policy_records",
            dec: "Create & Manage Policy Record's",
          },
          {
            title: "Revneue Record",
            icon: inc1,
            link: "/revneue_record",
            dec: "Create & Manage Revneue Record's",
          },
          {
            title: "Expence Record",
            icon: expence1,
            link: "/expence_record",
            dec: "Create & Manage Expence Record's",
          },
          {
            title: "User",
            icon: user1,
            link: "/user",
            dec: "Create & Manage User's",
          },

          {
            title: "Approve Fleet Record",
            icon: fleetApproveLogo,
            link: "/Approve_Fleet_Record",
            dec: "Make Approval to Fleet Record",
          },
        ]
      : userType === 0
        ? [
            {
              title: "Policy Record",
              icon: policy1,
              link: "/policy_records",
              dec: "Create & Manage Policy Record's",
            },
            {
              title: "Revneue Record",
              icon: inc1,
              link: "/revneue_record",
              dec: "Create & Manage Revneue Record's",
            },
            {
              title: "Expence Record",
              icon: expence1,
              link: "/expence_record",
              dec: "Create & Manage Expence Record's",
            },
            {
              title: "Fleet Record",
              icon: fleetLogo,
              link: "/sale",
              dec: "Create & Manage Fleet Record's",
            },
          ]
        : [
            {
              title: "Expence Record",
              icon: expence1,
              link: "/expence_record",
              dec: "Create & Manage Expence Record's",
            },
            {
              title: "Approve Expence Records",
              icon: approve1,
              link: "/approve_expence_record",
              dec: "Approve Expence Records and Reject Records",
            },
          ];

  const NAVIGATION =
    userType === 1
      ? [
          {
            kind: "header",
            title: "Main items",
          },
          {
            segment: "home",
            title: "Home",
            icon: <DashboardIcon />,
          },

          {
            kind: "divider",
          },
          {
            kind: "header",
            title: "More Options",
          },
          {
            segment: "reports",
            title: "Dashboard",
            icon: <BarChartIcon />,
            children: [
              {
                segment: "policy",
                title: "Policy Record",
                icon: <DescriptionIcon />,
              },
              {
                segment: "revneue",
                title: "Revneue Record",
                icon: <DescriptionIcon />,
              },
              {
                segment: "expence",
                title: "Expence Record",
                icon: <DescriptionIcon />,
              },
            ],
          },

          {
            segment: "Myprofile",
            title: "My Profile",
            icon: <UserIcon />,
          },
          {
            segment: "signOut",
            title: "SignOut",
            icon: <DescriptionIcon />,
          },
        ]
      : [
          {
            kind: "header",
            title: "Main items",
          },
          {
            segment: "home",
            title: "Home",
            icon: <DashboardIcon />,
          },
          {
            kind: "divider",
          },
          {
            kind: "header",
            title: "More Options",
          },

          {
            segment: "Myprofile",
            title: "My Profile",
            icon: <UserIcon />,
          },

          {
            segment: "signOut",
            title: "SignOut",
            icon: <DescriptionIcon />,
          },
        ];

  const userProfile = {
    name: "John Doe",
    avatar: "/images/profile.png",
  };
  return (
    // <AppProvider
    //   navigation={NAVIGATION}
    //   router={router}
    //   theme={demoTheme}
    //   window={demoWindow}
    // >
    //   <DashboardLayout>
    //     {/* User Profile Section */}
    //     <Stack
    //       direction="row"
    //       alignItems="center"
    //       spacing={2}
    //       sx={{
    //         p: 1,
    //         m: 2,
    //         border: "1px solid gray",
    //         borderRadius: "8px",
    //       }}
    //       className="MuiStack-root css-jjhd74-MuiStack-root w-fit max-lg:w-auto"
    //     >
    //       <Tooltip
    //         title="Your Profile"
    //         className="flex justify-center items-center gap-3 cursor-pointer"
    //       >
    //         <Avatar
    //           src={userProfile.avatar}
    //           alt={userProfile.name}
    //           className="w-[36px] h-[34px] object-cover"
    //         />
    //         <Typography variant="h6">
    //           {userName ? userName : userProfile.name}
    //         </Typography>
    //       </Tooltip>
    //       <Button
    //         type="button"
    //         className="capitalize"
    //         onClick={() => {
    //           router.navigate("/signOut"); // Navigate after logout
    //           // Signout(); // Call function correctly
    //         }}
    //       >
    //         Sign Out
    //       </Button>
    //     </Stack>
    //     <PageContainer className="min-w-full">
    //       {router.pathname === "/home" && (
    //         <Grid container spacing={1} justifyContent="center">
    //           <Grid item xs={12} md={8} lg={6}>
    //             <Cards data={CardData} />
    //           </Grid>
    //         </Grid>
    //       )}
    //       {router.pathname === "/administrator" && (
    //         <Grid container spacing={1} justifyContent="center">
    //           <Grid item xs={12} md={8} lg={6}>
    //             <Cards data={AddminstratorData} />
    //           </Grid>
    //         </Grid>
    //       )}
    //       {router.pathname === "/signOut" && (
    //         <Grid
    //           container
    //           spacing={1}
    //           justifyContent="center"
    //           alignItems="center"
    //         >
    //           <div className="w-full p-20 bg-transparent mt-20">
    //             <SignOut token={token} />
    //           </div>
    //         </Grid>
    //       )}
    //       {router.pathname === "/Myprofile" && (
    //         <Grid
    //           container
    //           spacing={1}
    //           justifyContent="center"
    //           alignItems="center"
    //         >
    //           <div className="w-full mt-2">
    //             <Profile token={token} />
    //           </div>
    //         </Grid>
    //       )}
    //       {router.pathname === "/reports/policy" && (
    //         <Grid
    //           container
    //           spacing={1}
    //           justifyContent="center"
    //           alignItems="center"
    //         >
    //           <>
    //             <PolicyChart />
    //           </>
    //         </Grid>
    //       )}
    //       {router.pathname === "/reports/revneue" && (
    //         <Grid
    //           container
    //           spacing={1}
    //           justifyContent="center"
    //           alignItems="center"
    //         >
    //           <RevneueChart
    //             texts={[
    //               "Revneue records",
    //               "Dashboard",
    //               "coming Soon",
    //               "optimized",
    //               "fast ⚡",
    //               "creative ✨",
    //               "🕶️ 🕶️ 🕶️",
    //             ]}
    //           />
    //         </Grid>
    //       )}
    //       {router.pathname === "/reports/expence" && (
    //         <Grid
    //           container
    //           spacing={1}
    //           justifyContent="center"
    //           alignItems="center"
    //         >
    //           <RevneueChart
    //             texts={[
    //               "Expence records",
    //               "Dashboard",
    //               "coming Soon",
    //               "optimized",
    //               "fast ⚡",
    //               "creative ✨",
    //               "🕶️ 🕶️ 🕶️",
    //             ]}
    //           />
    //         </Grid>
    //       )}
    //     </PageContainer>
    //   </DashboardLayout>
    // </AppProvider>
    <div>
      {router.pathname === "/home" && (
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Cards data={CardData} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
