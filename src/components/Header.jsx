import React from "react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-3">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">ChemPhyCalc</h1>
              <p className="text-sm text-blue-100">
                Chemical-Physics Calculator
              </p>
            </div>
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="/"
                  className="text-white hover:text-blue-200 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/chemical_reaction-calc"
                  className="text-white hover:text-blue-200 transition"
                >
                  Chemical
                </a>
              </li>
              <li>
                <a
                  href="/physics-calc"
                  className="text-white hover:text-blue-200 transition"
                >
                  Physics
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
