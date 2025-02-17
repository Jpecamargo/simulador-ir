"use client";

import Link from "next/link";
import Image from "next/image";
import Menu from "../../../public/menu-icon.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../contexts/authContext";

export default function Header() {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const buttonStyle = {
    selected:
      "text-white bg-blue-700  md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500",
    default:
      "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent",
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Simulador IR
        </span>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <Image src={Menu} alt="" />
        </button>
        <div
          className={`${isMenuOpen ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/declaracao"
                className={`block py-2 px-3 rounded ${
                  pathname == "/declaracao"
                    ? buttonStyle.selected
                    : buttonStyle.default
                }`}
                aria-current="page"
              >
                Nova declaração
              </Link>
            </li>
            <li>
              <Link
                href="/historico"
                className={`block py-2 px-3 rounded ${
                  pathname == "/historico"
                    ? buttonStyle.selected
                    : buttonStyle.default
                }`}
              >
                Histórico
              </Link>
            </li>
            <button className="text-red-500 mt-4 sm:mt-0" onClick={()=>{logout()}}>Sair</button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
