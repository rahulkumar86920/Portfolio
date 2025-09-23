import React, { useState } from "react";
import pic from "../../public/port-logo.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-scroll";

function Navbar() {
  const [menu, setMenu] = useState(false);
  /* nav bar is maped in this section and benged used 2 times */
  const NavItems = [
    { id: 1, Text: "Home" },
    { id: 2, Text: "About" },
    { id: 3, Text: "Portfolio" },
    { id: 4, Text: "Experiance" },
    { id: 5, Text: "Contact" },
  ];
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-0  fixed top-0 right-0 left-0 shadow-md bg-white z-50">
        <div className="flex justify-between items-center h-13">
          <div className="flex space-x-2">
            <img
              src={pic}
              className="h-12 w-12 rounded-full cursor-pointer mb-2"
              alt=""
            />
            <h1 className="font-semibold text-xl cursor-pointer">
              Rahu<span className="text-green-500 text-2xl">l</span>
              <p className="text-sm">Web Developer || DSA</p>
            </h1>
          </div>

          <div>
            {/* desktop navbar  through map function*/}
            <ul className="hidden md:flex space-x-8 ">
              {NavItems.map(({ id, Text }) => (
                <li
                  className="hover:scale-150 duration-200 cursor-pointer font-semibold"
                  key={id}
                >
                  <Link
                    to={Text}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    activeClass="active"
                  >
                    {Text}
                  </Link>
                </li>
              ))}
            </ul>
            <div onClick={() => setMenu(!menu)} className="md:hidden">
              {menu ? (
                <IoIosCloseCircle size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </div>
          </div>
        </div>
        {/* mobile navbar  through map function*/}
        {menu && (
          <div bg-white="true">
            <ul className="md:hidden flex flex-col items-center justify-center h-screen  shadow-sm space-y-2 font-bold text-xl">
              {NavItems.map(({ id, Text }) => (
                <li
                  className="hover:scale-150 duration-200 cursor-pointer"
                  key={id}
                >
                  <Link
                    onClick={() => setMenu(!menu)}
                    to={Text}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    activeClass="active"
                  >
                    {Text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
