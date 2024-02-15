"use client";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState<string | null>(null);
  const [visibleSubItems, setVisibleSubItems] = useState<string | null>(null);
  const visibleItem = (subItem: string) => {
    setVisibleSubItems((prevOpen) => (prevOpen === subItem ? null : subItem));
  };

  const visibleSub = (label: string) => {
    setVisible((prevOpen) => (prevOpen === label ? null : label));
  };

  const handleShow = () => {
    setOpen(!open);
  };

  return (
    <nav className=" flex justify-between h-20 px-4 xl:px-0 max-w-screen-xl m-auto">
      <Link href="/">
        <div className="my-5 text-2xl font-medium h-fit  border-4 px-2 text-center border-black">
          <h2>Photo Grid</h2>
        </div>
      </Link>
      {/* menu and close div */}
      <div className="flex items-center lg:hidden">
        <button aria-label="menu button" onClick={() => handleShow()}>
          {open ? (
            <svg
              className="w-10 h-10  text-gray-800 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          ) : (
            <svg
              className="w-10 h-10  text-gray-800 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 18 6m0 12L6 6"
              />
            </svg>
          )}
        </button>
      </div>
      <ul
        className={`lg:space-x-6 gap-y-4 text-lg  absolute  justify-between flex flex-col items-center lg:flex-row  z-50 lg:z-10  lg:static  lg:w-auto lg:py-0 pb-6  w-full left-0 ${
          open ? "hidden lg:flex " : "top-[64px]  bg-indigo-100 pt-6"
        }`}
      >
        {navItems.map((item) => (
          <li key={item.label}>
            {/* parents elements, conditional rendering for buttons and links  */}
            {item.subItems !== undefined ? (
              <button
              aria-label="Image category"
                className={`flex font-semibold text-gray-700 ${
                  visible === item.label
                    ? "transition duration-1000 ease-in-out justify-center px-2 border-2 rounded-xl bg-sky-600 text-white border-white p-1"
                    : ""
                }  `}
                onClick={() => {
                  visibleSub(item.label);
                }}
              >
                {item.label}
                <span>
                  {visible === item.label ? (
                    <svg
                      className="w-6 h-6 mt-0.5 text-white "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 15 7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 mt-0.5 text-black "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 9-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </button>
            ) : (
              <Link
                className="font-semibold text-gray-700"
                onClick={() => {
                  visibleSub(item.label);
                  handleShow();
                }}
                href={item.href}
              >
                {item.label}
              </Link>
            )}
            {/* children of links and buttons item.subItems */}
            {item.subItems && (
              <ul
                className={`sm:absolute ${
                  visible === item.label ? "block" : "hidden"
                } shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-50 transition duration-1000 ease-in-out bg-blue-300 rounded-xl mt-1 p-3 w-full sm:w-auto`}
              >
                {/* children of links and buttons item.subItems for mapping */}
                {item.subItems.map((subItem) => (
                  <li key={subItem.href} className="flex flex-col m-2 gap-2 ">
                    <div className="hover:bg-sky-600 font-medium	 hover:divide-x-2 hover:divide-white hover:border-white hover:text-white flex justify-between gap-1 border-2 border-black rounded-xl">
                      <Link
                        onClick={() => {
                          visibleSub("");
                          handleShow();
                        }}
                        href={subItem.href}
                        className="p-2 hover:text-white"
                      >
                        {subItem.label}
                      </Link>
                      <button
                        className="bg-sky-600  rounded-r-xl px-2"
                        onClick={() => {
                          visibleItem(subItem.href);
                        }}
                      >
                        <span>
                          {/* putting condition for close and open arrow */}
                          {visibleSubItems === subItem.href ? (
                            <svg
                              className="w-6 h-6 dark:text-white text-gray-800 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m5 15 7-7 7 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 h-6  text-gray-800 dark:text-white "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 9-7 7-7-7"
                              />
                            </svg>
                          )}
                        </span>
                      </button>
                    </div>
                    {/* grand children of buttons and links  */}
                    {visibleSubItems === subItem.href && subItem.subItems && (
                      <ul
                        className={`${
                          visible === item.label ? "block" : "hidden"
                        } z-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition duration-1000 border-2 border-black ease-in-out bg-blue-300 p-1 m-1 rounded-xl w-full sm:w-auto`}
                      >
                        {/* grand children of buttons and links for mapping  */}
                        {subItem.subItems.map((grandChildItem) => (
                          <li key={grandChildItem.href}>
                            <Link
                              onClick={() => {
                                visibleSub("");
                                handleShow();
                              }}
                              href={grandChildItem.href}
                              className="hover:bg-sky-600 font-medium hover:text-white hover:border-white flex flex-row m-2 justify-center text-black border-2 rounded-xl border-black p-1 "
                            >
                              {grandChildItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
