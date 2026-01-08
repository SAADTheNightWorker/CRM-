// import {
//   HomeOutlined,
//   LockOutlined,
//   LogoutOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Avatar, Button, Layout, Menu, Modal, theme, Tooltip } from "antd";
// import Sider from "antd/es/layout/Sider";
// import React, { useEffect, useState } from "react";
// import crm1 from "../../public/crm1.png";

// const SideBar = () => {
//   // const isLGScrenn = useMediaQuery({ query: "(min-width: 1536px)" });
//   // const isXLGScreen = useMediaQuery({ query: "(min-width: 1920px)" });
//   const [collapsed, setCollapsed] = useState(false);
//   const [open, setOpen] = useState(false);
//   const showModal = () => {
//     setOpen(true);
//   };
//   const hideModal = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setCollapsed(window.innerWidth <= 1535);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="w-full">
//       <Sider
//         className="min-h-screen bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//       >
//         <div
//           className={`${collapsed ? "flex-col" : "flex-row"} flex justify-center items-center`}
//         >
//           <img src={crm1} alt="logo" className="text-center w-28" />
//           <div className="md:flex hidden">
//             <Button
//               className="text-white"
//               type="button"
//               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               onClick={() => setCollapsed(!collapsed)}
//               style={{
//                 fontSize: "20px",
//                 width: 64,
//                 height: 64,
//               }}
//             />
//           </div>
//         </div>

//         <div className="demo-logo-vertical " />
//         <Menu
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={[
//             {
//               key: "1",
//               icon: <HomeOutlined />,
//               label: "Home",
//             },
//           ]}
//         />

//         <div
//           className="absolute bottom-10 transition-all duration-200
//             rounded-full left-5 text-white flex items-center gap-4 font-semibold hover:scale-105"
//           onClick={showModal}
//         >
//           {!collapsed && (
//             <div className="text-center">
//               <p className="underline">SAAD</p>
//               <p className="bg-green-500 rounded-sm text-xs">Admin</p>
//             </div>
//           )}
//           <Tooltip title="Open Profile Setting">
//             <Avatar
//               size="large"
//               src={crm1}
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: "100%",
//                 objectFit: "cover",
//                 border: `2px solid gray`,
//               }}
//               icon={UserOutlined}
//               className="hover:scale-110 transition-all duration-200"
//             />
//           </Tooltip>
//         </div>

//         <Modal
//           width={400}
//           open={open}
//           title={"Profile Setting"}
//           onOk={hideModal}
//           onCancel={hideModal}
//           footer={null}
//         >
//           <div className=" flex flex-col justify-start items-start">
//             {/* Profile Section */}
//             <section
//               className="flex items-center gap-2 mt-4 font-medium border w-full p-2 rounded-md hover:scale-105 duration-200
//                hover:bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]  hover:text-white text-gray-400
//              "
//             >
//               <UserOutlined
//                 className="hover:scale-125 duration-200"
//                 style={{ fontSize: "20px", color: "gray" }}
//               />
//               <p>Profile</p>
//             </section>

//             {/* Rest Password Section */}
//             <section
//               className="flex items-center gap-2 mt-4 font-medium border w-full p-2 rounded-md hover:scale-105 duration-200
//                 hover:bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]  hover:text-white text-gray-400
//             "
//             >
//               <LockOutlined
//                 className="hover:scale-125 duration-200"
//                 style={{ fontSize: "20px", color: "blue" }}
//               />
//               <p>Rest Password</p>
//             </section>
//             {/* Log Out Section */}
//             <section
//               className="flex items-center gap-2 mt-4 font-medium border w-full p-2 rounded-md hover:scale-105 duration-200
//                         hover:bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]  hover:text-white text-gray-400"
//             >
//               <LogoutOutlined
//                 className="hover:scale-125 duration-200"
//                 style={{ fontSize: "20px", color: "red" }}
//               />
//               <p>Log Out</p>
//             </section>
//           </div>
//         </Modal>
//       </Sider>
//     </div>
//   );
// };

// export default SideBar;
