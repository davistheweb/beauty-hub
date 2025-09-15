"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Session } from "@/hooks/Auth";

function AuthLayout({ title, children, subText, formTitle, formDes, onSubmit, errMsg }) {
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const router = useRouter();
  const serialize = (form) => {
    var result = [];
    if (typeof form === "object" && form.nodeName === "FORM")
      Array.prototype.slice.call(form.elements).forEach(function (control) {
        if (
          control.name &&
          !control.disabled &&
          ["file", "reset", "submit", "button"].indexOf(control.type) === -1
        )
          if (control.type === "select-multiple")
            Array.prototype.slice
              .call(control.options)
              .forEach(function (option) {
                if (option.selected)
                  result.push(control.name + "=" + option.value);
              });
          else if (
            ["checkbox", "radio"].indexOf(control.type) === -1 ||
            control.checked
          )
            result.push(control.name + "=" + control.value);
      });
    var data = result.join("&").replace(/%20/g, "+");

    const serializeToJSON = (str) =>
      str
        .split("&")
        .map((x) => x.split("="))
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {}
        );

    return serializeToJSON(data);
  };


  if (isAuthenticated.status === "authenticated") {
    (user?.value?.user?.email_verified_at && user?.value?.user?.email_verified_at !== null) ? router.push("/") : router.push('/auth/accountverification')
  } else {
    return (
      <div className="min-h-screen grid lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault(), onSubmit(serialize(e.target));
          }} >
          <div className="space-y-4">
            <div className="text-red-500 text-xs">{errMsg}</div>
            <div className="space-y-5">{children}</div>
          </div>
        </form>
      </div>
    );
  }

}

export default AuthLayout;
