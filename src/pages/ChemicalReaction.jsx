import React, { useState } from "react";
import { ChemicalReactionForm } from "../components/ChemicalReactionForm";
import { ResultDisplay } from "../components/ResultDisplay";
import { ChemAIResponse } from "../components/ChemAIResponse";

export const ChemicalReaction = () => {
  const [reactionResult, setReactionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processReaction = async (reactants) => {
    setLoading(true);
    setError(null);
    try {
      const aiResult = await ChemAIResponse(reactants);
      setReactionResult(aiResult);
      console.log(aiResult);
    } catch (err) {
      setError(err.message);
      setReactionResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-400 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        🧮 Chemical Reaction Calculator
      </h1>
      <p className="text-center text-gray-600 max-w-md">
        Enter 2 or more chemical reactants to compute the product.Thus
        completing balanced chemical equation.
      </p>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <ChemicalReactionForm onSubmit={processReaction} />

          {loading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {reactionResult && !loading && (
            <ResultDisplay result={reactionResult} />
          )}
        </div>
      </main>
      <footer className="mt-16 text-gray-500 text-sm">
        ©2025 Build by Priyansh Patel. Built with 🧠 and ❤️.
      </footer>
    </div>
  );
};
