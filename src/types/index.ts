type TReoveryStage = "email-form" | "otp-form" | "reset-form";

type TCurrentSettingTab = "profile-tab" | "security-tab" | "banner-tab";

type TBookingDetails = {
  customer: string;
  package: string;
  date: string;
  status: "In Progress" | "Done" | "Cancelled" | "";
};

type TDummyCustomers = {
  customerName: string;
  emailAddress: string;
  phoneNumber: string;
  dateCreated: string;
  status: "Active" | "Inactive";
};

type TDummyServices = {
  imgSrc: string;
  serviceType: string;
  serviceAmount: string;
  allServices: string[];
  status: "Inactive" | "Active" | "";
};

type TDummyStaffs = {
  staffName: string;
  joinedDate: string;
  status: "Inactive" | "Active" | "Suspended";
  numberOfBookings: string;
};

type TDummyRatings = {
  ratingDate: string;
  starsCount: number;
  userName: string;
  title?: string;
  comment: string;
};

type TDummyBannerSettings = {
  imgSrc: string;
  title: string;
  message: string;
  status: "Active" | "Inactive";
};

export type {
  TBookingDetails,
  TCurrentSettingTab,
  TDummyBannerSettings,
  TDummyCustomers,
  TDummyRatings,
  TDummyServices,
  TDummyStaffs,
  TReoveryStage,
};
