import { SVGProps } from "react";

interface NotFoundProps extends SVGProps<SVGSVGElement> {
  size?: `${number}` | number;
  color?: string;
}

const NotFound = ({
  size = 24,
  color = "#111827",
  ...props
}: NotFoundProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 122 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M55.9167 96.5833C78.3763 96.5833 96.5833 78.3763 96.5833 55.9167C96.5833 33.4571 78.3763 15.25 55.9167 15.25C33.4571 15.25 15.25 33.4571 15.25 55.9167C15.25 78.3763 33.4571 96.5833 55.9167 96.5833Z"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M106.75 106.75L84.6377 84.6375"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NotFound;
