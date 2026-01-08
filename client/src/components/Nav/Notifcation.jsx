// First export to avoid confusion
// import React from "react";
// import { motion, useDragControls } from "framer-motion";
// import { TrashIcon } from "@heroicons/react/24/solid";

// const dummyNotifications = [
//   {
//     id: 1,
//     title: "New Message",
//     message: "You received a new message from John.",
//     time: "2 min ago",
//     unread: true,
//   },
//   {
//     id: 2,
//     title: "Payment Successful",
//     message: "Your subscription payment was completed.",
//     time: "1 hour ago",
//     unread: true,
//   },
//   {
//     id: 3,
//     title: "System Update",
//     message: "New dashboard features are now live.",
//     time: "Yesterday",
//     unread: false,
//   },
// ];

// const Notification = ({ className }) => {
//   const controls = useDragControls();
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`z-50 ${className}`}
//     >
//       <div className="h-[40rem] w-[22rem] topNavBg border border-gray-200 rounded-xl shadow-xl flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <h2 className="text-sm font-semibold">Notifications</h2>
//           <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
//             2 Unread
//           </span>
//         </div>

//         {/* Notification List */}
//         <motion.div
//           onClick={(e) => e.stopPropagation()}
//           drag="y"
//           dragControls={controls}
//           dragListener={false}
//           dragConstraints={{ top: 0, bottom: 240 }}
//           dragElastic={0.12}
//           onDragEnd={(e, info) => {
//             // close if dragged down enough OR swiped with velocity
//             const shouldClose = info.offset.y > 140 || info.velocity.y > 900;
//             if (shouldClose)
//               onClose();
//           }}
//           className="flex-1 overflow-y-auto"
//         >
//           {dummyNotifications.map((item) => (
//             <div
//               onPointerDown={(e) => controls.start(e)}
//               key={item.id}
//               className={`px-4 py-3 border-b cursor-pointer transition ${
//                 item.unread
//                   ? " hover:bg-gray-200 font-medium bg-gray-100 text-gray-600"
//                   : "hover:bg-gray-50 hover:text-gray-600"
//               }`}
//             >
//               <div className="flex justify-between items-start gap-2">
//                 <div>
//                   <p className="text-sm font-medium ">{item.title}</p>
//                   <p className="text-xs mt-0.5">{item.message}</p>
//                 </div>

//                 {item.unread && (
//                   <span className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
//                 )}
//               </div>

//               <p className="text-[11px] text-gray-400 mt-1">{item.time}</p>
//               <div className="flex justify-end">
//                 <TrashIcon className="h-4 w-4 text-red-500" />
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Footer */}
//         <div className="px-4 py-3 border-t text-center">
//           <button className="text-sm text-blue-600 hover:underline">
//             View all notifications
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// Secound export to avoid confusion
// export default Notification;
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { TrashIcon } from "@heroicons/react/24/solid";

// const dummyNotifications = [
//   {
//     id: 1,
//     title: "New Message",
//     message: "You received a new message from John.",
//     time: "2 min ago",
//     unread: true,
//   },
//   {
//     id: 2,
//     title: "Payment Successful",
//     message: "Your subscription payment was completed.",
//     time: "1 hour ago",
//     unread: true,
//   },
//   {
//     id: 3,
//     title: "System Update",
//     message: "New dashboard features are now live.",
//     time: "Yesterday",
//     unread: false,
//   },
// ];

// function SwipeRow({ item, onDelete }) {
//   const SWIPE_DELETE_DISTANCE = 120; // px
//   const SWIPE_DELETE_VELOCITY = 800; // px/s

//   return (
//     <div className="relative border-b">
//       {/* Background (revealed while swiping) */}
//       <div className="absolute inset-0 bg-red-500/90 flex items-center justify-end px-4">
//         <TrashIcon className="h-5 w-5 text-white" />
//       </div>

//       {/* Foreground (draggable card) */}
//       <motion.div
//         drag="x"
//         dragConstraints={{ left: 0, right: 0 }}
//         dragElastic={0.2}
//         whileTap={{ cursor: "grabbing" }}
//         onDragEnd={(e, info) => {
//           const shouldDelete =
//             info.offset.x < -SWIPE_DELETE_DISTANCE ||
//             info.velocity.x < -SWIPE_DELETE_VELOCITY;

//           if (shouldDelete) onDelete(item.id);
//         }}
//         // Snap back if not deleted
//         animate={{ x: 0 }}
//         transition={{ type: "spring", stiffness: 500, damping: 40 }}
//         className={`relative px-4 py-3 cursor-pointer transition bg-white ${
//           item.unread
//             ? "hover:bg-gray-200 font-medium bg-gray-100 text-gray-600"
//             : "hover:bg-gray-50 hover:text-gray-600"
//         }`}
//       >
//         <div className="flex justify-between items-start gap-2">
//           <div>
//             <p className="text-sm font-medium">{item.title}</p>
//             <p className="text-xs mt-0.5">{item.message}</p>
//           </div>

//           {item.unread && (
//             <span className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
//           )}
//         </div>

//         <p className="text-[11px] text-gray-400 mt-1">{item.time}</p>

//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(item.id);
//             }}
//             className="p-1"
//             aria-label="Delete notification"
//           >
//             <TrashIcon className="h-4 w-4 text-red-500" />
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// const Notification = ({ className }) => {
//   const [notifications, setNotifications] = useState(dummyNotifications);

//   const unreadCount = notifications.filter((n) => n.unread).length;

//   const handleDelete = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`z-50 ${className}`}
//     >
//       <div className="h-[40rem] w-[22rem] topNavBg border border-gray-200 rounded-xl shadow-xl flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <h2 className="text-sm font-semibold">Notifications</h2>
//           <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
//             {unreadCount} Unread
//           </span>
//         </div>

//         {/* Notification List */}
//         <div className="flex-1 overflow-y-auto">
//           <AnimatePresence initial={false}>
//             {notifications.map((item) => (
//               <motion.div
//                 key={item.id}
//                 layout
//                 initial={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="overflow-hidden"
//               >
//                 <SwipeRow item={item} onDelete={handleDelete} />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Footer */}
//         <div className="px-4 py-3 border-t text-center">
//           <button className="text-sm text-blue-600 hover:underline">
//             View all notifications
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Notification;
// Secound Last export to avoid confusion

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
// import { useNavigate } from "react-router-dom"; // if you're using react-router
// import { useDispatch, useSelector } from "react-redux";
// import { getNotifications } from "../../../store/actionApis/notification.Api";
// import moment from "moment";

// const dummyNotifications = [
//   {
//     id: 1,
//     title: "New Message",
//     message: "You received a new message from John.",
//     time: "2 min ago",
//     unread: true,
//   },
//   {
//     id: 2,
//     title: "Payment Successful",
//     message: "Your subscription payment was completed.",
//     time: "1 hour ago",
//     unread: true,
//   },
//   {
//     id: 3,
//     title: "System Update",
//     message: "New dashboard features are now live.",
//     time: "Yesterday",
//     unread: false,
//   },
// ];

// function SwipeRow({ item, onDelete, onOpen }) {
//   // console.log("Notification", notifications?.payload);

//   // Swipe thresholds
//   const OPEN_DISTANCE = 110; // swipe right
//   const DELETE_DISTANCE = 110; // swipe left
//   const VELOCITY = 800;

//   return (
//     <div className="relative border-b overflow-hidden">
//       {/* Left side background OPEN */}
//       <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-500/90 flex items-center justify-start px-4">
//         <EyeIcon className="h-5 w-5 text-white" />
//       </div>

//       {/* RIGHT background (Delete) */}
//       <div className="absolute inset-y-0 right-0 w-1/2 bg-red-500/90 flex items-center justify-end px-4">
//         <TrashIcon className="h-5 w-5 text-white" />
//       </div>
//       <motion.div
//         drag="x"
//         dragConstraints={{ left: 0, right: 0 }}
//         dragElastic={0.2}
//         whileTap={{ cursor: "grabbing" }}
//         onDragEnd={(e, info) => {
//           const swipeRight =
//             info.offset.x > OPEN_DISTANCE || info.velocity.x > VELOCITY;
//           const swipeLeft =
//             info.offset.x < -DELETE_DISTANCE || info.velocity.x < -VELOCITY;

//           if (swipeRight) {
//             onOpen(item);
//             return;
//           }
//           if (swipeLeft) {
//             onDelete(item.id);
//             return;
//           }
//         }}
//         animate={{ x: 0 }}
//         transition={{ type: "spring", stiffness: 500, damping: 40 }}
//         className={`relative px-4 py-2 cursor-pointer transition bg-white ${
//           item.is_read == 0
//             ? "hover:bg-gray-200 font-medium bg-gray-100 text-gray-600"
//             : "hover:bg-gray-50 hover:text-gray-600 text-gray-600 bg-gray-50"
//         }`}
//       >
//         {/* <div className="flex justify-between items-start gap-2">
//           <div className="">
//             <p className="text-sm font-medium">
//               <span className="text-primary">Dear:</span> {item?.name}
//             </p>
//             <p className="text-sm font-medium">
//               <span className="text-primary">Broker:</span> {item?.title}
//               <span className="text-xs">
//                 a Policy Expired on: ( {moment(item?.expire_on).format("llll")} )
//               </span>
//             </p>

//              <p className="text-xs mt-0.5 w-72">{item?.description.slice(0, 30)}</p>
//           </div>

//           {item.is_read == 0 && (
//             <span className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
//           )}
//         </div> */}
//         <div className="flex justify-between items-start gap-2">
//           <div>
//             <p className="text-sm font-medium flex">
//               <span className=""></span>{" "}
//               <p className="text-primary">{item?.name}</p>
//             </p>

//             <p className="text-xs text-gray-600">
//               Your policy expired on{" "}
//               <span className="font-medium">
//                 {moment(item?.expire_on).format("llll")}
//               </span>
//               .
//             </p>
//           </div>

//           {item.is_read == 0 && (
//             <span className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
//           )}
//         </div>

//         <p className="text-[11px] text-gray-400 mt-1">
//           {moment(item?.created_at).format("llll")}
//         </p>

//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(item.id);
//             }}
//             className="p-1"
//             aria-label="Delete notification"
//           >
//             <TrashIcon className="h-4 w-4 text-red-500" />
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default function Notification({ className }) {
//   const [notification, setNotifications] = useState([]);
//   const [IsView, setIsView] = useState(false);
//   const navigate = useNavigate();
//   const { notifications } = useSelector((state) => state.notifications);
//   console.log("Notifications from store", notifications);
//   const unreadCount = 1;
//   // console.log(unreadCount);

//   const handleDelete = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   const handleOpen = (item) => {
//     setIsView(!IsView);
//     // Navigate to a full message/details page
//     // Example route: /message/1
//     console.log("ID", item?.id, "Notifcation", item);

//     // navigate(`/message/${item.id}`, { state: { notification: item } });
//   };
//   const dispatch = useDispatch();
//   // Fetching data from Api
//   useEffect(() => {
//     setNotifications(notifications?.payload || []);
//     dispatch(getNotifications());
//   }, [dispatch]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`z-50 ${className}`}
//       whileTap={{}}
//     >
//       <div className="h-[40rem] w-[22rem] topNavBg border border-gray-200 rounded-xl shadow-xl flex flex-col">
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <h2 className="text-sm font-semibold">Notifications</h2>
//           <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
//             {notification?.map((item) => {
//               if (item.is_read == 0) {
//                 return 1;
//               }
//               return 0;
//             })}{" "}
//             Unread
//           </span>
//         </div>
//         {!IsView ? (
//           <div className="flex-1 overflow-y-auto">
//             <AnimatePresence initial={false}>
//               {notification?.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   layout
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="overflow-hidden"
//                 >
//                   <SwipeRow
//                     item={item}
//                     onDelete={handleDelete}
//                     onOpen={handleOpen}
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         ) : (
//           <div className="flex-1 overflow-y-auto">
//             <AnimatePresence initial={false}>
//               {notification?.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   layout
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="overflow-hidden"
//                 >
//                   <FullNotificationView
//                     notification={item}
//                     setIsView={setIsView}
//                     IsView={IsView}
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         <div className="px-4 py-3 border-t text-center">
//           <button className="text-sm text-blue-600 hover:underline">
//             View all notifications
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export const FullNotificationView = ({ notification, setIsView, IsView }) => {
//   return (
//     <div className="p-4">
//       <button
//         onClick={() => setIsView(!IsView)}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         Back to Notifications
//       </button>
//       <h2 className="text-lg font-semibold mb-2 flex items-center gap-1 border-b"><span>Dear'</span> <p className="text-primary">{notification?.name}</p></h2>
//       <h2 className="text-md font-semibold mb-2 flex items-center gap-1 border-b"><span>Broker'</span>  <p className="text-primary">{notification?.title}</p></h2>
//       <h2 className="text-sm font-semibold mb-2  items-center gap-1"><span>Description</span>  <p className="text-primary">{notification?.description}</p></h2>
//       <p className="text-sm text-gray-600 mb-4">
//         Policy expired On: {moment(notification?.expire_on).format("LLLL")}
//       </p>
//       <p className="text-sm text-gray-600 mb-4">
//         Received: {moment(notification?.created_at).format("LLLL")}
//       </p>
//       <p className="text-sm text-gray-600 mb-4">
//         From : {notification?.team_name}
//       </p>
//       <p className="text-gray-800">{notification.message}</p>
//     </div>
//   );
// };

// ✅ Complete + Professional + Interactive Notifications (List + Full View)
// - Fix unread count (your old code returns an array)
// - Fix full view (your old code shows ALL items in full view)
// - Add smooth animations with AnimatePresence
// - Swipe right to OPEN, swipe left to DELETE
// - Optional actions: Mark as read, Renew policy (hook your API later)

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notification as toast } from "antd";
import {
  EyeIcon,
  TrashIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  EnvelopeOpenIcon,
  BuildingOffice2Icon,
  ShieldExclamationIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteNotifications,
  getNotifications,
} from "../../../store/actionApis/notification.Api";
import moment from "moment";

// ==============================
// Swipe Row (List Item)
// ==============================
function SwipeRow({ item, onDelete, onOpen }) {
  const OPEN_DISTANCE = 110; // swipe right
  const DELETE_DISTANCE = 110; // swipe left
  const VELOCITY = 800;

  return (
    <div className="relative border-b overflow-hidden">
      {/* Left background (Open) */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-500/90 flex items-center justify-start px-4">
        <EyeIcon className="h-5 w-5 text-white" />
      </div>

      {/* Right background (Delete) */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-red-500/90 flex items-center justify-end px-4">
        <TrashIcon className="h-5 w-5 text-white" />
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        whileTap={{ cursor: "grabbing" }}
        onDragEnd={(e, info) => {
          const swipeRight =
            info.offset.x > OPEN_DISTANCE || info.velocity.x > VELOCITY;
          const swipeLeft =
            info.offset.x < -DELETE_DISTANCE || info.velocity.x < -VELOCITY;

          if (swipeRight) return onOpen(item);
          if (swipeLeft) return onDelete(item.id);
        }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className={`relative px-4 py-2 cursor-pointer transition bg-white ${
          item?.is_read == 0
            ? "hover:bg-gray-200 font-medium bg-gray-100 text-gray-700"
            : "hover:bg-gray-50 text-gray-700 bg-gray-50"
        }`}
        onClick={() => onOpen(item)}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold flex items-center gap-2">
              <span className="text-primary truncate">
                {item?.name || "Customer"}
              </span>
            </p>

            <p className="text-xs text-gray-600 mt-0.5">
              Your policy expired on{" "}
              <span className="font-medium">
                {item?.expire_on ? moment(item?.expire_on).format("llll") : "—"}
              </span>
              .
            </p>
          </div>

          {item?.is_read == 0 && (
            <span className="h-2 w-2 rounded-full bg-blue-500 mt-1 shrink-0" />
          )}
        </div>

        <p className="text-[11px] text-gray-400 mt-1">
          {item?.created_at ? moment(item?.created_at).fromNow() : ""}
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-1"
            aria-label="Delete notification"
            title="Delete"
          >
            <TrashIcon className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ==============================
// Full View (Details)
// ==============================
export const FullNotificationView = ({
  notification,
  onBack,
  onDelete,
  onMarkAsRead, // optional
  onRenew, // optional
}) => {
  const isUnread = notification?.is_read == 0;

  return (
    <motion.div
      key={notification?.id}
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="p-4"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={onBack}
          className="inline-flex hover:scale-110 duration-200 items-center gap-2 text-blue-600 hover:underline text-sm"
        >
          <ArrowLeftCircleIcon className="h-8 w-10" />
        </button>

        <div className="flex items-center gap-2">
          {isUnread && typeof onMarkAsRead === "function" && (
            <button
              type="button"
              onClick={() => onMarkAsRead(notification?.id)}
              className="text-[11px] px-2 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 inline-flex items-center gap-1"
              aria-label="Mark as read"
              title="Mark as read"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Mark as read
            </button>
          )}

          {typeof onDelete === "function" && (
            <button
              type="button"
              onClick={() => onDelete(notification?.id)}
              className="text-[11px] px-6 py-1 rounded-full bg-red-50 text-red-700 hover:bg-red-100 inline-flex items-center gap-1"
              aria-label="Delete notification"
              title="Delete"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <ShieldExclamationIcon className="h-5 w-5 text-amber-500" />
              <h2 className="text-base font-semibold text-gray-900 truncate">
                Policy Expired
              </h2>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Dear{" "}
              <span className="font-semibold text-primary">
                {notification?.name || "Customer"}
              </span>
              , your policy has expired. Please renew to avoid interruption in
              coverage.
            </p>
          </div>

          {typeof onRenew === "function" && (
            <button
              onClick={() => onRenew(notification)}
              className="shrink-0 text-sm px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Renew Now
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-2">
              <CalendarDaysIcon className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Expired on</p>
                <p className="text-sm text-gray-800 font-medium">
                  {notification?.expire_on
                    ? moment(notification?.expire_on).format("LLLL")
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <EnvelopeOpenIcon className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Received</p>
                <p className="text-sm text-gray-800 font-medium">
                  {notification?.created_at
                    ? moment(notification?.created_at).format("LLLL")
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <BuildingOffice2Icon className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">From</p>
                <p className="text-sm text-gray-800 font-medium">
                  {notification?.team_name || "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs text-gray-500">Broker</p>
              <p className="text-sm text-gray-800 font-medium text-right">
                {notification?.title || "—"}
              </p>
            </div>

            <div className="h-px bg-gray-200" />

            <div>
              <p className="text-xs text-gray-500">Description</p>
              <p className="text-sm text-gray-800 leading-relaxed mt-1">
                {notification?.description || "—"}
              </p>
            </div>
          </div>

          {notification?.message && (
            <div>
              <p className="text-xs text-gray-500">Message</p>
              <p className="text-sm text-gray-800 leading-relaxed mt-1">
                {notification?.message}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-end gap-2">
          <button
            onClick={onBack}
            className="text-sm px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Close
          </button>

          {typeof onRenew === "function" && (
            <button
              onClick={() => onRenew(notification)}
              className="text-sm px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Renew Policy
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ==============================
// Main Notification Component
// ==============================
export default function Notification({ className }) {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);

  const [list, setList] = useState([]);
  const [isView, setIsView] = useState(false);
  const [selected, setSelected] = useState(null);

  // Sync store -> local list
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    setList(notifications?.payload || []);
  }, [notifications]);

  // ✅ correct unread count
  const unreadCount = useMemo(() => {
    return (list || []).filter((n) => n?.is_read == 0).length;
  }, [list]);

  const handleDelete = async (id) => {
    console.log("DELETE", id);

    try {
      const payload = { id };

      const response = await dispatch(DeleteNotifications(payload));
      console.log("CHECK RES", response);

      if (response?.payload?.success == true) {
        toast.success({
          message: "Deleted",
          description: "Notification has been deleted successfully",
        });
        setSelected(null);
        setIsView(false);
        // UI only (hook your API later)
        // setList((prev) => prev.filter((n) => n.id !== id));

        // If user deletes currently open notification, close view
        // if (selected?.id === id) {
        //   setSelected(null);
        //   setIsView(false);
        // }

        return;
      }

      toast.error({
        message: "Error",
        description: "Something went wrong while deleting the notification",
      });
    } catch (error) {
      console.error("DELETE ERROR:", error);

      toast.error({
        message: "Error",
        description: "Failed to delete notification",
      });
    }
  };

  const handleOpen = (item) => {
    setSelected(item);
    setIsView(true);

    // Optional: you can mark as read UI-only here
    // setList((prev) =>
    //   prev.map((n) => (n.id === item.id ? { ...n, is_read: 1 } : n))
    // );
  };

  const handleBack = () => {
    setIsView(false);
    setSelected(null);
  };

  const handleMarkAsRead = (id) => {
    // UI only (hook your API later)
    setList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n))
    );
  };

  const handleRenew = (n) => {
    // Hook your route / modal / API
    console.log("Renew policy clicked:", n);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`z-50 ${className}`}
    >
      <div className="h-[40rem] w-[22rem] topNavBg border border-gray-200 rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
          <h2 className="text-sm font-semibold">Notifications</h2>

          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            {unreadCount} Unread
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            {!isView ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {list?.length ? (
                  <AnimatePresence initial={false}>
                    {list.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <SwipeRow
                          item={item}
                          onDelete={handleDelete}
                          onOpen={handleOpen}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-500">
                    No notifications found.
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FullNotificationView
                  notification={selected}
                  onBack={handleBack}
                  onDelete={handleDelete}
                  onMarkAsRead={handleMarkAsRead}
                  onRenew={handleRenew}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t text-center bg-white">
          <button className="text-sm text-blue-600 hover:underline">
            View all notifications
          </button>
        </div>
      </div>
    </motion.div>
  );
}
