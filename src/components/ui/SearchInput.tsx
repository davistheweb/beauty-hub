import { Search } from "lucide-react";

const SearchInput = () => (
  <div className="relative flex items-center justify-center p-1">
    <input
      type="text"
      name=""
      id=""
      className="w-[136px] rounded-md border border-[#C2C2C2] py-1 pr-3 pl-7 outline-none placeholder:text-[14px] sm:w-[300px]"
      placeholder="Search"
    />
    <span className="absolute top-3.5 left-3">
      <Search size={15} />
    </span>
  </div>
);

export default SearchInput;
