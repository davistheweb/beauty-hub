import { Search } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="relative flex w-full items-center justify-start p-1">
    <input
      type="text"
      name=""
      id=""
      value={value}
      className="w-full rounded-md border border-[#C2C2C2] py-1 pr-3 pl-7 font-semibold outline-none placeholder:text-[14px] sm:w-[300px]"
      placeholder="Search"
      onChange={onChange}
    />
    <span className="absolute top-3.5 left-3">
      <Search size={15} />
    </span>
  </div>
);

export default SearchInput;
