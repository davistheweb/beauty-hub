interface IDashboardCardProps {
  title: string;
  subtitle: string | number;
  icon: React.ReactNode;
}
export const DashboardCard = ({
  title,
  subtitle,
  icon,
}: IDashboardCardProps) => (
  <div className="flex h-24 max-h-28 w-full items-center justify-between gap-3 rounded-sm bg-white p-4 duration-300 hover:-translate-y-3">
    <div className="flex h-[80px] w-[230px] flex-col gap-1 p-2">
      <p className="text-[14px] text-[#898A8C]">{title}</p>
      <h1 className="text-xl font-semibold">{subtitle}</h1>
    </div>
    {icon}
  </div>
);
