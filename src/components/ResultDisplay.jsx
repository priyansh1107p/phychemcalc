import React from "react";

export const ResultDisplay = ({ result }) => {
  if (!result) return null;
  const { equation, products, description } = result;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Reaction Results
      </h3>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-2">
          Balanced Equation:
        </h4>
        <div className="bg-white p-4 rounded-md shadow-sm">
          <p className="text-lg font-mono text-center">{equation}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-2">Products:</h4>
        <div className="grid gap-3 md:grid-cols-2">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-sm border-l-4 border-green-500"
            >
              <p className="font-medium">{product}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">
          Reaction Details:
        </h4>
        <div className="bg-white p-4 rounded-md shadow-sm">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
