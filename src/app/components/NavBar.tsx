"use client";
import React, { useState } from "react";
import SearchBar from "./SeachBar";
import { CiShoppingCart } from "react-icons/ci";
import { BsChevronCompactUp } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <div className="flex items-center py-4  pl-16 flex space-x-20">
      <div className="flex items-center md:space-x-8 lg:space-x-20">
        <div className="font-semibold text-2xl ">
          {" "}
          <Link href="/">SEINE</Link>
        </div>
        <nav className="mx-md:hidden pl-10">
          <ul className="flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]">
            <li>
              <Link href="/" className="py-3 inline-block w-full">
                Car
              </Link>
            </li>
            <li>
              <div className="py-3 inline-block w-full">
                Filters
              </div>
            </li>
            <li>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex space-x-6 pl-20">
        <SearchBar />
        <span
          onClick={() => !showNav}
          className="p-[9px] bg-grey-100 rounded-full md:hidden"
        >
          <BsChevronCompactUp
            className={`transition ease-in duration-150 ${
              showNav ? "rotate-180" : "0"
            }`}
          />
        </span>
      </div>
      <div
        className={`md:hidden ${
          showNav ? "pb-4 px-5" : "h-0 invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col text-[15px] opacity-75 px-2">
          <li>
            <Link href="/Car" className="py-3 inline-block w-full">
              Car
            </Link>
          </li>
          <li>
            <Link href="/filters" className="py-3 inline-block w-full">
              Filters
            </Link>
          </li>
          <li>
          </li>
        </ul>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3">
          <input
            type="text"
            className="outline-none w-full  bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-grey-600 text-[15px]"
            placeholder="Search"
            autoComplete="false"
          />
          <button>
            <BiSearch  size={20} className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
