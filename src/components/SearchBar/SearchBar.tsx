import React, { useState } from "react";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

const SearchBar = ({
  value,
  handleChange,
}: {
  value: string | undefined;
  handleChange: (value: string) => void;
}) => {
  return (
    <div className="relative bg-gray-200 p-2 w-full flex justify-between items-center">
      <div className="w-[80%] relative">
        <SearchSharpIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 px-4 py-2 rounded-lg border focus:outline-none w-full"
          onChange={(event) => handleChange(event.target.value)}
          value={value}
        />
      </div>
      <HomeSharpIcon className="h-8 w-8" />
    </div>
  );
};

export default SearchBar;
