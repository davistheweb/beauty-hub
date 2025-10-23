import { ErrorType } from "@/types/Error";
import { NetWorkError, NotFound, UnknownError } from "../icons";

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
  const renderSVG = () => {
    switch (errorType) {
      case "network":
        return (
          <NetWorkError
            className="h-40 w-40"
            color="#C7C7C7"
          />
        );
      case "not_found":
        return (
          <NotFound
            className="h-40 w-40 text-gray-400"
            color="#C7C7C7"
          />
        );
      case "server":
        return (
          <UnknownError
            className="h-40 w-40 text-yellow-500"
            color="#FF3333"
          />
        );
      default:
        return (
          <UnknownError
            className="h-40 w-40 text-gray-500"
            color="#FF3333"
          />
        );
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div>{renderSVG()}</div>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-[14px] text-[#898A8C]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
