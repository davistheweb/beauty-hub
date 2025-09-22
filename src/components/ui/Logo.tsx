import Image from "next/image";

const Logo = ({ width, height }: { width: number; height: number }) => (
  <div className="flex flex-row items-center gap-1 p-1 lg:flex-col">
    <Image
      src="/images/Logo.png"
      alt="Logo"
      width={width}
      height={height}
    />
    <span className="text-custom-green text-[11.5px] font-bold">BeautyHub</span>
  </div>
);
export default Logo;
