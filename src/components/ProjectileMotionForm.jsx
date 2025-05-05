// ProjectileMotionForm.jsx
import React, { useState } from "react";
import { PhyAIResponse } from "./PhyAIResponse";
import { ProjectileResult } from "./ProjectileResult";

export const ProjectileMotionForm = () => {
  const [inputs, setInputs] = useState({
    u: "",
    angle: "",
    h: "",
    R: "",
    T: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await PhyAIResponse(inputs);
      setResult(res);
    } catch (err) {
      alert("AI could not calculate this. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg space-y-4">
        {["u", "angle", "h", "R", "T"].map((key) => (
          <div key={key}>
            <label className="block text-gray-700 font-medium mb-1">
              {key === "u"
                ? "Initial Velocity (u) [m/s]"
                : key === "angle"
                ? "Angle (θ) [degrees]"
                : key === "h"
                ? "Max Height (h) [m]"
                : key === "R"
                ? "Range (R) [m]"
                : "Time of Flight (T) [s]"}
            </label>
            <input
              type="number"
              step="any"
              name={key}
              value={inputs[key]}
              onChange={handleChange}
              placeholder="Leave blank if unknown"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Solving..." : "Solve with AI"}
        </button>
      </div>

      {result && <ProjectileResult result={result} inputs={inputs} />}
    </div>
  );
};
