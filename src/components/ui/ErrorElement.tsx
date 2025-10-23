import { ErrorType } from "@/types/Error";
import Image from "next/image";

interface ErrorElement {
  title: string;
  subtitle: string;
  errorType: ErrorType;
  children?: React.ReactNode;
}

export const ErrorElement = ({
  title,
  subtitle,
  errorType,
  children,
}: ErrorElement) => {
  const imageSrc =
    errorType === "network"
      ? "/images/network_error.png"
      : errorType === "not_found"
        ? "/images/404_not_found.png"
        : "/images/server_error.png";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div>
        <Image
          src={imageSrc}
          alt={`${errorType} image`}
          width={170}
          height={170}
          draggable={false}
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-[14px] text-[#898A8C]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
