import React from "react";
import ProjectileAnimation from "./ProjectileAnimation";

export const ProjectileResult = ({ result }) => {
  const { formulas_used, results, tip } = result;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Results</h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="text-gray-700">
            <strong>{key.toUpperCase()}:</strong> {value}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2 text-blue-700">
          🚀 Trajectory Visualization
        </h3>
        <ProjectileAnimation result={result} />
      </div>

      <h3 className="text-lg font-medium mt-6 text-green-700">
        🧠 Formulas Used
      </h3>
      <ul className="list-disc list-inside text-gray-600">
        {formulas_used.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>

      <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
        💡 <strong>Tip:</strong> {tip}
      </div>
    </div>
  );
};
