"use client";

import { useNotifications } from "@/hooks";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getDateGroup } from "@/lib/utils/getDateGroup";
import { AppDispatch, RootState } from "@/store";
import { setOpenNotifications } from "@/store/utils/notificationStateSlice";
import { INotification } from "@/types/INotifications";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoDataFoundElement } from "./no-data";
import { CardSkeleton } from "./ui/CardSkeleton";
import { ErrorElement } from "./ui/ErrorElement";

export default function Notifications() {
  const { notifications, isLoading, notificationErrorMessage, isError } =
    useNotifications();

  const notificationRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const isNotificationsOpen = useSelector(
    (state: RootState) => state.notification.openNotifications,
  );

  const isMobile = useIsMobile();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      )
        dispatch(setOpenNotifications(!isNotificationsOpen));
    };

    if (isNotificationsOpen)
      document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isNotificationsOpen, dispatch]);

  const groupedNotifications = notifications.reduce<
    Record<"Today" | "Yesterday" | "Other days", INotification[]>
  >(
    (acc, notification) => {
      const key = getDateGroup(notification.created_at);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(notification);
      return acc;
    },
    { Today: [], Yesterday: [], "Other days": [] },
  );

  console.log(groupedNotifications);

  return (
    <AnimatePresence>
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#4C4C4C57] backdrop-blur-[5px]">
          <motion.div
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="flex h-full w-full justify-end"
          >
            <div
              ref={notificationRef}
              className="relative mt-20 flex h-full max-h-[calc(100vh-5rem)] w-full flex-col rounded-t-xl border-2 border-[#D1F0DE] bg-white md:mt-0 md:h-[600px] md:w-[400px] md:rounded-none md:rounded-l-md"
            >
              <button
                className="absolute top-3 right-4 cursor-pointer text-gray-400"
                onClick={() =>
                  dispatch(setOpenNotifications(!isNotificationsOpen))
                }
              >
                <X size={35} />
              </button>

              <div className="mt-5 h-fit p-5">
                <h1 className="text-center text-[18px] font-bold text-[#070500] md:text-[24px]">
                  Notifications
                </h1>
              </div>

              {!isLoading && !isError && !notifications.length ? (
                <div className="flex h-full w-full items-center justify-center">
                  <NoDataFoundElement
                    title="No Avaliable Notifications"
                    subtitle="Notifications will appear here when there is..."
                  />
                </div>
              ) : isError ? (
                <div className="flex h-full w-full items-center justify-center">
                  <ErrorElement
                    errorType={notificationErrorMessage.type}
                    title="Something went wrong"
                    subtitle={notificationErrorMessage.message}
                  />
                </div>
              ) : isLoading ? (
                <div className="scrollbar-thin flex flex-1 flex-col gap-2 overflow-y-auto p-2">
                  <CardSkeleton className="h-[70px] w-full" />
                </div>
              ) : (
                <div className="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6">
                  {Object.entries(groupedNotifications).map(
                    ([notificationGroup, notifications], _i) => (
                      <div
                        key={_i}
                        className="space-y-3"
                      >
                        <div className="rounded-md bg-[#F9FFFB] px-4 py-3">
                          <h1
                            className={`${
                              notificationGroup === "Today"
                                ? "text-[#1AB65C]"
                                : "text-[#002050]"
                            } font-semibold select-none`}
                          >
                            {notificationGroup}
                          </h1>
                        </div>
                        <div className="space-y-2 pb-2">
                          {notifications.map((notification, _i) => (
                            <div
                              key={_i}
                              className="relative flex flex-col gap-2 rounded-md bg-[#F9FFFB] px-3 py-2"
                            >
                              <span className="text-end text-xs font-normal text-[#898A8C]">
                                {new Date(
                                  notification.created_at.replace(" ", "T"),
                                ).toLocaleTimeString()}
                              </span>

                              <div className="flex flex-col gap-1">
                                <h1 className="text-[14px] font-semibold capitalize">
                                  {JSON.parse(
                                    notification.data,
                                  ).type.replaceAll("_", " ")}
                                </h1>
                                <p className="text-[14px] text-[#898A8C]">
                                  {JSON.parse(notification.data).message}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// #FF3333; -> reddot
