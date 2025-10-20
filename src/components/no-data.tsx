import Image from "next/image";

interface INotFoundElementProps {
  title: string;
  subtitle: string;
  colSpan?: number;
  children?: React.ReactNode;
}
const NoDataFoundTableDesktopComponent = ({
  title,
  subtitle,
  colSpan,
  children,
}: INotFoundElementProps & { colSpan: number }) => (
  <tbody
    className="h-full w-full items-center justify-center"
    suppressHydrationWarning={true}
  >
    <tr className="h-full">
      <td
        colSpan={colSpan}
        className="h-full items-center justify-center"
      >
        <NoDataFoundElement
          title={title}
          subtitle={subtitle}
        >
          {children}
        </NoDataFoundElement>
      </td>
    </tr>
  </tbody>
);

const NoDataFoundTableMobileComponent = ({
  title,
  subtitle,
}: INotFoundElementProps) => (
  <NoDataFoundElement
    title={title}
    subtitle={subtitle}
  />
);

const NoDataFoundElement = ({
  title,
  subtitle,
  children,
}: INotFoundElementProps) => (
  <div
    className="flex h-full w-full flex-col items-center justify-center gap-2"
    suppressHydrationWarning={true}
  >
    <div>
      <Image
        src="/images/no_record.png"
        alt="no record image"
        width={170}
        height={170}
        draggable={false}
      />
    </div>
    <div className="flex flex-col gap-2 text-center">
      <h1 className="font-semibold">{title}</h1>
      <p className="text-[14px] text-[#898A8C]">{subtitle}</p>
    </div>
    {children}
  </div>
);

export {
  NoDataFoundElement,
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
};
