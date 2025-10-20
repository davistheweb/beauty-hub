import { SVGProps } from "react";

interface PhoneIconProps extends SVGProps<SVGSVGElement> {
  size?: `${number}` | number;
  color?: string;
}

const PhoneIcon = ({
  size = 24,
  color = "#111827",
  ...props
}: PhoneIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.90223 7.79C5.34223 10.62 7.66223 12.93 10.4922 14.38L12.6922 12.18C12.9622 11.91 13.3622 11.82 13.7122 11.94C14.8322 12.31 16.0422 12.51 17.2822 12.51C17.8322 12.51 18.2822 12.96 18.2822 13.51V17C18.2822 17.55 17.8322 18 17.2822 18C7.89223 18 0.282227 10.39 0.282227 1C0.282227 0.45 0.732227 0 1.28223 0H4.78223C5.33223 0 5.78223 0.45 5.78223 1C5.78223 2.25 5.98223 3.45 6.35223 4.57C6.46223 4.92 6.38223 5.31 6.10223 5.59L3.90223 7.79Z"
        fill={color}
      />
    </svg>
  );
};

export default PhoneIcon;

// Usage examples:
// <PhoneIcon />
// <PhoneIcon size={32} color="#3B82F6" />
// <PhoneIcon size="32" color="#3B82F6" />
// <PhoneIcon className="hover:opacity-80" />
