"use server";
import { cookies } from "next/headers";

const storeAccessBearerToken = async (bearer_token: string) => {
  if (!bearer_token) throw new Error("Bearer token cannot be empty");

  const userCookie = await cookies();

  console.log("AccessBearerToken: ", bearer_token);

  userCookie.set({
    name: "beauty_atk", //beauty_access_token
    value: bearer_token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
};

const getAccessToken = async () => {
  const token: string | undefined = (await cookies()).get("beauty_atk")?.value;

  return token;
};

const deleteAccessBearerToken = async () => {
  (await cookies()).delete("beauty_atk");
};

export { deleteAccessBearerToken, getAccessToken, storeAccessBearerToken };
