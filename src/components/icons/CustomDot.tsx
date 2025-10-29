import { SVGProps } from "react";

interface CustomDotProps extends SVGProps<SVGSVGElement> {
  size?: `${number}` | number;
  color?: string;
}

const CustomDot = ({
  size = 24,
  color = "#111827",
  ...props
}: CustomDotProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="4"
        cy="4"
        r="4"
        fill={color}
      />
    </svg>
  );
};

export default CustomDot;
