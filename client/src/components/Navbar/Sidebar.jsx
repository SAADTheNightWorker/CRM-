import React from "react";
import { createPortal } from "react-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";

import {
  UserIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  Bars3Icon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";

import { useLocation, useNavigate } from "react-router-dom";
import {
  LeftCircleOutlined,
  PaperClipOutlined,
  SecurityScanFilled,
} from "@ant-design/icons";

const MD = 768;
const Z_FLYOUT = 2147483647; // always on top

// ✅ Non-blinking tooltip (pure CSS placeholder)
function IconTooltip({ children }) {
  return <span className="relative inline-flex group">{children}</span>;
}

export default function Sidebar({ userType }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openAcc, setOpenAcc] = React.useState(0);
  const [collapsed, setCollapsed] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);

  const [flyout, setFlyout] = React.useState({
    open: false,
    anchorRect: null,
    item: null,
  });

  const sidebarRef = React.useRef(null);
  const flyoutRef = React.useRef(null);

  // hover intent timers
  const openTimer = React.useRef(null);
  const closeTimer = React.useRef(null);

  const isActive = React.useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const closeFlyout = React.useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setFlyout({ open: false, anchorRect: null, item: null });
  }, []);

  const handleOpenAcc = React.useCallback((value) => {
    // ✅ only one open at a time (already correct)
    setOpenAcc((v) => (v === value ? 0 : value));
  }, []);

  const NAVIGATION = React.useMemo(() => {
    return userType === 1
      ? [
          {
            link: "/",
            title: "Home",
            icon: <DashboardIcon fontSize="medium" />,
          },
          { kind: "divider" },
          { kind: "header", title: "More Options" },
          {
            title: "Dashboard",
            icon: <BarChartIcon fontSize="medium" />,
            children: [
              {
                link: "/policies_dashboard",
                title: "Policy RC Dashboard",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              // {
              //   link: "/revenue_dashboard",
              //   title: "Revenue RC Dashboard",
              //   icon: <DescriptionIcon fontSize="medium" />,
              // },
              {
                link: "/bi_dashboard",
                title: "Power Bi Dashboard",
                icon: <DescriptionIcon fontSize="medium" />,
              },
            ],
          },
          {
            title: "Modules",
            icon: <SecurityScanFilled fontSize="medium" />,
            children: [
              {
                link: "/policy_records",
                title: "Policy Record",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/revneue_record",
                title: "Revenue Record",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/expence_record",
                title: "Expense Record",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/Approve_Fleet_Record",
                title: "Sales Approval",
                icon: <DescriptionIcon fontSize="medium" />,
              },
            ],
          },
          {
            title: "Administration",
            icon: <PaperClipOutlined fontSize="medium" />,
            children: [
              {
                link: "/client",
                title: "Manage Client",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/company",
                title: "Manage Company",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/broker",
                title: "Manage Broker",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/agent",
                title: "Manage Agent",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/vendor",
                title: "Manage Vendor",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/category",
                title: "Manage Category",
                icon: <DescriptionIcon fontSize="medium" />,
              },
              {
                link: "/payment",
                title: "Manage Payment",
                icon: <DescriptionIcon fontSize="medium" />,
              },
            ],
          },
          {
            link: "/profile",
            title: "My Profile",
            icon: <UserIcon className="h-6 w-6" />,
          },
          {
            link: "/signOut",
            title: "SignOut",
            icon: <DescriptionIcon fontSize="medium" />,
          },
        ]
      : [
          { kind: "header", title: "Main items" },
          {
            link: "/",
            title: "Home",
            icon: <DashboardIcon fontSize="medium" />,
          },
          { kind: "divider" },
          { kind: "header", title: "More Options" },
          {
            link: "/profile",
            title: "My Profile",
            icon: <UserIcon className="h-6 w-6" />,
          },
          {
            link: "/signOut",
            title: "SignOut",
            icon: <DescriptionIcon fontSize="medium" />,
          },
        ];
  }, [userType]);

  // ✅ Auto-CLOSE only below md (never auto-open on zoom out)
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < MD) setCollapsed(true);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ Close flyout on route change + (optional) open the correct accordion when expanded
  React.useEffect(() => {
    closeFlyout();

    // ✅ If expanded, auto-open accordion that contains the active route
    if (!collapsed) {
      let foundAcc = 0;
      NAVIGATION.forEach((item, idx) => {
        if (item?.children?.length) {
          const accordionValue = idx + 1;
          if (item.children.some((c) => c.link === location.pathname)) {
            foundAcc = accordionValue;
          }
        }
      });
      setOpenAcc(foundAcc);
    } else {
      // collapsed: keep accordions closed
      setOpenAcc(0);
    }
  }, [location.pathname, collapsed, NAVIGATION, closeFlyout]);

  // ✅ Outside click closes flyout (only when collapsed)
  React.useEffect(() => {
    const onDown = (e) => {
      if (!collapsed) return;
      const inSidebar = sidebarRef.current?.contains(e.target);
      const inFlyout = flyoutRef.current?.contains(e.target);
      if (!inSidebar && !inFlyout) closeFlyout();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [collapsed, closeFlyout]);

  // ✅ ESC closes flyout
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeFlyout();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeFlyout]);

  // ✅ cleanup timers on unmount
  React.useEffect(() => {
    return () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
    };
  }, []);

  // ✅ smart flyout positioning: flip if needed + clamp
  const getFlyoutStyle = (anchorRect) => {
    const width = 280;
    const gap = 10;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = anchorRect.right + gap;
    if (left + width > vw - 12) left = anchorRect.left - gap - width;

    const top = Math.max(12, Math.min(anchorRect.top, vh - 12 - 240));
    return { top, left, width };
  };

  // ✅ OPEN flyout: closes previous first + prevents multi-open feeling
  const openFlyoutFor = React.useCallback(
    (item, anchorEl) => {
      if (!collapsed) return;

      const rect = anchorEl.getBoundingClientRect();

      setFlyout((prev) => {
        // if same item already open, just refresh anchor rect (helps positioning)
        if (prev.open && prev.item?.title === item.title) {
          return { ...prev, anchorRect: rect };
        }
        return { open: true, anchorRect: rect, item };
      });
    },
    [collapsed]
  );

  const scheduleOpenFlyout = (item, anchorEl) => {
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);

    openTimer.current = setTimeout(() => {
      openFlyoutFor(item, anchorEl);
    }, 90);
  };

  const scheduleCloseFlyout = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);

    closeTimer.current = setTimeout(() => {
      closeFlyout();
    }, 140);
  };

  const sidebarWidthClass = collapsed
    ? "w-[7rem] overflow-x-hidden"
    : "w-full min-w-[20rem] overflow-x-hidden";

  const renderDivider = (key) => (
    <div key={key} className="my-2 h-px w-full border border-gray-200/80" />
  );

  const renderHeader = (key, title) =>
    collapsed ? null : (
      <Typography
        key={key}
        className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-blue-gray-500"
      >
        {title}
      </Typography>
    );

  // ✅ Portal Flyout (always on top)
  const FlyoutPortal = () => {
    if (!collapsed) return null;
    if (!flyout.open || !flyout.item?.children?.length || !flyout.anchorRect)
      return null;

    const { top, left, width } = getFlyoutStyle(flyout.anchorRect);

    return createPortal(
      <div
        ref={flyoutRef}
        role="menu"
        aria-label={`${flyout.item.title} submenu`}
        style={{ position: "fixed", top, left, width, zIndex: Z_FLYOUT }}
        className="rounded-2xl border border-gray-200 bg-white shadow-2xl"
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={scheduleCloseFlyout}
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <Typography className="text-sm font-semibold text-gray-900">
            {flyout.item.title}
          </Typography>
          <Typography className="text-[12px] text-gray-500">
            Choose an option
          </Typography>
        </div>

        <div className="p-2">
          {flyout.item.children.map((child) => {
            const active = isActive(child.link);
            return (
              <button
                key={child.link}
                role="menuitem"
                className={[
                  "w-full text-left rounded-xl px-3 py-2.5 flex items-center gap-3",
                  "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10",
                  active ? "bg-gray-100 font-semibold" : "",
                ].join(" ")}
                onClick={() => {
                  // ✅ close instantly when selecting an item
                  closeFlyout();
                  setOpenAcc(0);
                  navigate(child.link);
                }}
              >
                <span className="inline-flex text-gray-600">{child.icon}</span>
                <span className="text-sm text-gray-900">{child.title}</span>
              </button>
            );
          })}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="relative topNavBg">
      <div
        ref={sidebarRef}
        className={[
          "relative z-20 pb-10",
          "h-[calc(100vh-6vh)] p-4 flex flex-col border-r border-gray-200",
          "shadow-sm transition-all duration-300 overflow-x-hidden overflow-auto",
          sidebarWidthClass,
        ].join(" ")}
      >
        {/* Toggle */}
        <div className="mb-1 flex items-center justify-end">
          <button
            onClick={() => {
              setCollapsed((v) => !v);
              closeFlyout();
              setOpenAcc(0);
            }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            bgtitle="Toggle Sidebar Collapse"
            className="p-1 px-2 rounded-full hover:bg-gray-200 transition"
          >
            <LeftCircleOutlined
              className={`
      text-lg
      transition-transform duration-300 ease-in-out text-gray-500
      ${collapsed ? "rotate-0" : "rotate-180"}
    `}
            />
          </button>
        </div>

        <List className="flex-1">
          {NAVIGATION.map((item, idx) => {
            if (item.kind === "divider") return renderDivider(`div-${idx}`);
            if (item.kind === "header")
              return renderHeader(`hdr-${idx}`, item.title);

            // Group items
            if (item.children?.length) {
              const accordionValue = idx + 1;
              const isAnyChildActive = item.children.some((c) =>
                isActive(c.link)
              );

              // Collapsed => flyout on hover
              if (collapsed) {
                const isThisFlyoutOpen =
                  flyout.open && flyout.item?.title === item.title;

                return (
                  <div key={`grp-${idx}`} className="relative">
                    <ListItem
                      role="button"
                      tabIndex={0}
                      aria-haspopup="menu"
                      aria-expanded={isThisFlyoutOpen}
                      className={[
                        "my-2 rounded-xl border border-gray-200 shadow-sm justify-center",
                        "hover:bg-black hover:text-white transition-all duration-200 text-sm",
                        isAnyChildActive ? "bg-black text-white" : "",
                      ].join(" ")}
                      onMouseEnter={(e) => {
                        // ✅ close previous immediately when switching to another group
                        closeFlyout();
                        scheduleOpenFlyout(item, e.currentTarget);
                      }}
                      onMouseLeave={scheduleCloseFlyout}
                      onFocus={(e) => openFlyoutFor(item, e.currentTarget)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openFlyoutFor(item, e.currentTarget);
                        }
                      }}
                    >
                      <ListItemPrefix className="mr-0">
                        <IconTooltip>
                          <span
                            className="inline-flex"
                            style={{ fontSize: 20 }}
                          >
                            {item.icon}
                          </span>
                        </IconTooltip>
                      </ListItemPrefix>
                    </ListItem>
                  </div>
                );
              }

              // Expanded => accordion
              return (
                <Accordion
                  key={`acc-${idx}`}
                  open={openAcc === accordionValue}
                  className="my-2 rounded-xl border border-gray-200 shadow-sm"
                  icon={
                    <ChevronDownIcon
                      className={`mx-auto h-4 w-4 transition-transform duration-300 ${
                        openAcc === accordionValue ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={isAnyChildActive}>
                    <AccordionHeader
                      onClick={() => handleOpenAcc(accordionValue)}
                      className="border-b border-gray-100 p-3 transition-all duration-200 text-sm titleText"
                    >
                      <ListItemPrefix style={{ fontSize: 20 }}>
                        {item.icon}
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal">
                        {item.title}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>

                  <AccordionBody className="py-2 bg-white rounded-b-xl border max-h-[22vh] overflow-auto">
                    <List className="p-0">
                      {item.children.map((child, cIdx) => (
                        <ListItem
                          key={`acc-${idx}-child-${cIdx}`}
                          onClick={() => {
                            // ✅ close instantly when selecting an item
                            setOpenAcc(0);
                            closeFlyout();
                            navigate(child.link);
                          }}
                          selected={isActive(child.link)}
                          className={[
                            "pl-6 rounded-xl hover:bg-black hover:text-white transition-all duration-200 text-sm my-2",
                            isActive(child.link)
                              ? "bg-black text-white font-semibold shadow"
                              : "titleText",
                          ].join(" ")}
                        >
                          <ListItemPrefix>{child.icon}</ListItemPrefix>
                          {child.title}
                        </ListItem>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              );
            }

            // Normal links
            return (
              <ListItem
                key={`item-${idx}`}
                onClick={() => {
                  closeFlyout();
                  setOpenAcc(0);
                  navigate(item.link);
                }}
                selected={isActive(item.link)}
                className={[
                  "my-2 rounded-xl border border-gray-200 shadow-sm hover:bg-black hover:text-white transition-all duration-200 text-sm titleText",
                  collapsed ? "justify-center" : "",
                  isActive(item.link)
                    ? "bg-gray-900 text-white font-semibold shadow"
                    : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex items-center gap-4",
                    collapsed ? "justify-center w-full" : "",
                  ].join(" ")}
                >
                  {collapsed ? (
                    <IconTooltip>
                      <span className="inline-flex">{item.icon}</span>
                    </IconTooltip>
                  ) : (
                    <span className="inline-flex">{item.icon}</span>
                  )}
                  {!collapsed && <span>{item.title}</span>}
                </div>
              </ListItem>
            );
          })}
        </List>

        {/* {!collapsed && (
          <Alert
            open={openAlert}
            className="mt-auto text-white bg-gray-900 p-6 shadow-lg"
          >
            <CubeTransparentIcon className="mb-4 h-10 w-10 text-white" />
            <Typography variant="h6" className="mb-1">
              New CRM Update Available
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              You can now manage policy records and track sales expenses more
              efficiently.
            </Typography>

            <div className="mt-4 flex gap-3">
              <Typography
                as="button"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography
                as="button"
                variant="small"
                className="font-medium text-blue-300"
                onClick={() => {
                  closeFlyout();
                  setOpenAcc(0);
                  navigate("/policies");
                }}
              >
                View Update
              </Typography>
            </div>
          </Alert>
        )} */}
      </div>

      {/* ✅ always on top */}
      <FlyoutPortal />
    </div>
  );
}
