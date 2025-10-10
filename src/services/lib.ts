"use server";
import { cookies } from "next/headers";

const storeAccessBearerToken = async (bearer_token: string) => {
  if (!bearer_token) throw new Error("Bearer token cannot be empty");

  const userCookie = await cookies();

  console.log("AccessBearerToken: ", bearer_token);

  userCookie.set({
    name: "access_bearer_token",
    value: bearer_token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
};

const getAccessToken = async () => {
  const token: string | undefined = (await cookies()).get(
    "access_bearer_token",
  )?.value;

  return token;
};

const deleteAccessBearerToken = async () => {
  (await cookies()).delete("access_bearer_token");
};

export { deleteAccessBearerToken, getAccessToken, storeAccessBearerToken };

// import Cookies from "js-cookie";

// const storeAccessBearerToken = (bearer_token: string) => {
//   if (!bearer_token) throw new Error("Bearer token cannot be empty");

//   const userCookie = Cookies;

//   console.log("AccessBearerToken: ", bearer_token);

//   userCookie.set("access_bearer_token", bearer_token, { expires: 1 });

//   //Was supposed to use this in nextjs-cookie from "next/headers"
//   // userCookie.set({
//   //   name: "access_bearer_token",
//   //   value: bearer_token,
//   //   httpOnly: true,
//   //   secure: true,
//   //   sameSite: "strict",
//   //   path: "/",
//   //   maxAge: 60 * 60,
//   // });
// };

// const getAccessToken = () => {
//   const token: string | undefined = Cookies.get("access_bearer_token");

//   return token;
// };

// const deleteAccessBearerToken = () => {
//   Cookies.remove("access_bearer_token");
// };

// export { deleteAccessBearerToken, getAccessToken, storeAccessBearerToken };
