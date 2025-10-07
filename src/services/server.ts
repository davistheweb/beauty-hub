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
    maxAge: 60,
  });
};



const deleteAccessBearerToken = async () => {
  (await cookies()).delete("access_bearer_token");
};

export {
  deleteAccessBearerToken,
  storeAccessBearerToken,
};
