import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-full max-md:hidden gap-x-1 border-[1px] border-lightText/50">
      <button>
        <BiSearch size={20} className="opacity-50" />
      </button>
      <input
        type="text"
        className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-grey-600 text-[15px]"
        placeholder="Search"
        autoComplete="false"
      />
    </div>
  );
};

export default SearchBar;
