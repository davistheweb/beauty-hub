"use client";

import {
  ProfileFormSchema,
  ProfileFormValues,
} from "@/lib/validators/ProfileFormSchema";
import {
  SecurityFormSchema,
  SecurityFormValues,
} from "@/lib/validators/SecurityFormSchema";
import { RootState } from "@/store";
import { TCurrentSettingTab } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import BannerSettings from "./BannerSettings";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";

export default function Settings() {
  const [currentSettingsTab, setCurrentSettingsTab] =
    useState<TCurrentSettingTab>(() => {
      const savedSettingsTab = Cookies.get("currentSettingsTab");
      if (
        savedSettingsTab === "profile-tab" ||
        savedSettingsTab === "security-tab" ||
        savedSettingsTab === "banner-tab"
      )
        return savedSettingsTab;

      return "profile-tab";
    });
  const [componentIsUploading, setComponentIsUploading] =
    useState<boolean>(false);

  const adminState = useSelector((state: RootState) => state.admin.profile);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      fullName: adminState?.fullName,
      email: adminState?.email,
      phoneNumber: adminState?.phoneNumber,
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(SecurityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleCurrentSettingsChange = (tab: TCurrentSettingTab) => {
    if (componentIsUploading) {
      alert("A settings tab is currently busy, Please wait...");
      return;
    }
    const now = new Date();

    const settingsStoreExpirationTime = new Date(now.getTime() + 1 * 60 * 1000);

    Cookies.set("currentSettingsTab", tab, {
      expires: settingsStoreExpirationTime,
    });

    setCurrentSettingsTab(tab);
  };

  return (
    <div className="mt-5 flex w-full flex-col rounded-md bg-white p-1 px-1 pb-1 lg:px-8">
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
        <ProfileSettings
          setComponentIsUploading={setComponentIsUploading}
          profileForm={profileForm}
        />
      ) : currentSettingsTab === "security-tab" ? (
        <SecuritySettings
          setComponentIsUploading={setComponentIsUploading}
          securityForm={securityForm}
        />
      ) : (
        currentSettingsTab === "banner-tab" && (
          <BannerSettings setComponentIsUploading={setComponentIsUploading} />
        )
      )}
      {/* <div
        className={clsx(
          "[&>*]:hidden",
          currentSettingsTab === "profile-tab" && "[&>*:nth-child(1)]:block",
          currentSettingsTab === "security-tab" && "[&>*:nth-child(2)]:block",
          currentSettingsTab === "banner-tab" && "[&>*:nth-child(3)]:block",
        )}
      >
        <ProfileSettings
          setComponentIsUploading={setComponentIsUploading}
          profileForm={profileForm}
        />
        <SecuritySettings
          setComponentIsUploading={setComponentIsUploading}
          securityForm={securityForm}
        />
        <BannerSettings setComponentIsUploading={setComponentIsUploading} />
      </div> */}
    </div>
  );
}
