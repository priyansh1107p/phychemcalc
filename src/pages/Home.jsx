import React from "react";

export const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-6">
          Science Solver Hub 🔬⚛️
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 text-center max-w-2xl mb-10">
          Your one-stop destination to balance complex chemical equations and
          solve physics kinematics problems with ease.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <h2 className="text-xl sm:text-2xl flex flex-col items-center text-center justify-center font-semibold text-indigo-600 mb-2">
              <div className=" text-center">⚗️ Chemical Reaction</div>
              <div className="text-center">Calculator</div>
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Balance any chemical equation automatically and understand the
              reaction behind it.
            </p>
            <a
              href="/chemical_reaction-calc"
              className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition"
            >
              Try Now
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <h2 className="text-xl sm:text-2xl flex flex-col items-center text-center justify-center font-semibold text-green-600 mb-2">
              <div className=" text-center">🧮 Kinematics Equation</div>
              <div className="text-center">Solver</div>
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Solve velocity, acceleration, displacement and projectile motion with our intuitive
              physics calculator.
            </p>
            <a
              href="/physics-calc"
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              Solve Now
            </a>
          </div>
        </div>

        <footer className="mt-16 text-gray-500 text-sm items-center text-center flex-col flex justify-center">
          <div>©2025 Build by Priyansh Patel</div>
          <div>Built with 🧠 and ❤️.</div>
        </footer>
      </div>
    </>
  );
};
