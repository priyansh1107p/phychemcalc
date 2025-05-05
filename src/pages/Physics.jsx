import React, { useState } from "react";
import { ProjectileMotionForm } from "../components/ProjectileMotionForm";
import { PhyAIResponse } from "../components/PhyAIResponse";
import { ProjectileResult } from "../components/ProjectileResult";

export const Physics = () => {
  const [inputValues, setInputValues] = useState({
    u: "",
    angle: "",
    h: "",
    R: "",
    T: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const aiResult = await PhyAIResponse(inputValues);
      setResult(aiResult);
    } catch (err) {
      setError("Something went wrong while fetching the AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🎯 Projectile Motion Solver
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Enter at least two values (Initial Velocity, Launch Angle, Max Height,
        Range, Time of Flight) to calculate the rest with help from AI. Get
        formulas, results, and tips.
      </p>

      <ProjectileMotionForm
        values={inputValues}
        setValues={setInputValues}
        onSubmit={handleSubmit}
      />

      {loading && (
        <p className="text-center mt-6 text-blue-500 font-medium">
          Loading AI results...
        </p>
      )}

      {error && (
        <p className="text-center mt-6 text-red-500 font-medium">{error}</p>
      )}

      {result && !loading && !error && (
        <div className="mt-10">
          <ProjectileResult result={result} />
        </div>
      )}
      <footer className="mt-16 text-gray-500 text-sm items-center text-center flex justify-center">
        ©2025 Build by Priyansh Patel. Built with 🧠 and ❤️.
      </footer>
    </div>
  );
};
