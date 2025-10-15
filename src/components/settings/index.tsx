"use client";

import { TCurrentSettingTab } from "@/types";
import { useState } from "react";
import { Button } from "../ui/button";
import BannerSettings from "./BannerSettings";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";

export default function Settings() {
  const [currentSettingsTab, setCurrentSettingsTab] =
    useState<TCurrentSettingTab>(() => {
      const savedSettingsTab = localStorage.getItem("currentSettingsTab");
      if (
        savedSettingsTab === "profile-tab" ||
        savedSettingsTab === "security-tab" ||
        savedSettingsTab === "banner-tab"
      )
        return savedSettingsTab;

      return "profile-tab";
    });

  const handleCurrentSettingsChange = (tab: TCurrentSettingTab) => {
    localStorage.setItem("currentSettingsTab", tab);
    setCurrentSettingsTab(tab);
  };

  return (
    <div className="mt-5 flex w-full flex-col rounded-md bg-white pb-5 p-1 px-1 lg:px-8">
      <div className="flex h-12 w-full items-center justify-center gap-2 lg:justify-start">
        <Button
          className={`cursor-pointer rounded-[4px] border ${
            currentSettingsTab === "profile-tab"
              ? "text-custom-green border-[#B3E7C9] after:absolute after:bottom-0 after:h-[4px] after:w-[36px] after:rounded-t-md after:bg-[#1AB65C] after:content-['']"
              : "text-[#898A8C]"
          } relative bg-white text-sm font-normal transition-all duration-500 hover:border-[#B3E7C9] hover:bg-white/50 hover:text-[#1AB65C]`}
          onClick={() => handleCurrentSettingsChange("profile-tab")}
        >
          Profile
        </Button>
        <Button
          className={`cursor-pointer rounded-[4px] border ${
            currentSettingsTab === "security-tab"
              ? "text-custom-green border-[#B3E7C9] after:absolute after:bottom-0 after:h-[4px] after:w-[47px] after:rounded-t-md after:bg-[#1AB65C] after:content-['']"
              : "text-[#898A8C]"
          } relative bg-white text-sm font-normal transition-all duration-500 hover:border-[#B3E7C9] hover:bg-white/50 hover:text-[#1AB65C]`}
          onClick={() => handleCurrentSettingsChange("security-tab")}
        >
          Security
        </Button>
        <Button
          className={`cursor-pointer rounded-[4px] border ${
            currentSettingsTab === "banner-tab"
              ? "text-custom-green border-[#B3E7C9] after:absolute after:bottom-0 after:h-[4px] after:w-[89px] after:rounded-t-md after:bg-[#1AB65C] after:content-['']"
              : "text-[#898A8C]"
          } relative bg-white text-sm font-normal transition-all duration-500 hover:border-[#B3E7C9] hover:bg-white/50 hover:text-[#1AB65C]`}
          onClick={() => handleCurrentSettingsChange("banner-tab")}
        >
          Banner Settings
        </Button>
      </div>
      {currentSettingsTab === "profile-tab" ? (
        <ProfileSettings />
      ) : currentSettingsTab === "security-tab" ? (
        <SecuritySettings />
      ) : (
        currentSettingsTab === "banner-tab" && <BannerSettings />
      )}
    </div>
  );
}
