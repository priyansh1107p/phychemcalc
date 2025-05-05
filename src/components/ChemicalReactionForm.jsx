import React, { useState } from "react";

export const ChemicalReactionForm = ({ onSubmit }) => {
  const [reactants, setReactants] = useState(["", ""]);
  const [suggestions, setSuggestions] = useState([]);

  const commonChemicals = [
    { id: "h2", name: "H₂ (Hydrogen)" },
    { id: "o2", name: "O₂ (Oxygen)" },
    { id: "n2", name: "N₂ (Nitrogen)" },
    { id: "co2", name: "CO₂ (Carbon Dioxide)" },
    { id: "h2o", name: "H₂O (Water)" },
    { id: "ch4", name: "CH₄ (Methane)" },
    { id: "naoh", name: "NaOH (Sodium Hydroxide)" },
    { id: "hcl", name: "HCl (Hydrochloric Acid)" },
    { id: "na", name: "Na (Sodium)" },
    { id: "cl2", name: "Cl₂ (Chlorine)" },
    { id: "c6h12o6", name: "C₆H₁₂O₆ (Glucose)" },
    { id: "h2so4", name: "H₂SO₄ (Sulfuric Acid)" },
    { id: "nh3", name: "NH₃ (Ammonia)" },
    { id: "c2h5oh", name: "C₂H₅OH (Ethanol)" },
    { id: "k", name: "K (Potassium)" },
  ];

  const handleReactantChange = (index, value) => {
    const newReactants = [...reactants];
    newReactants[index] = value;
    setReactants(newReactants);

    if (value.trim() !== "") {
      const filtered = commonChemicals.filter(
        (chemical) =>
          chemical.id.toLowerCase().includes(value.toLowerCase()) ||
          chemical.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions({ index, chemicals: filtered });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (chemicalId, index) => {
    const newReactants = [...reactants];
    newReactants[index] = chemicalId;
    setReactants(newReactants);
    setSuggestions([]);
  };

  const addReactant = () => {
    setReactants([...reactants, ""]);
  };

  const removeReactant = (index) => {
    if (reactants.length <= 2) return;
    const newReactants = reactants.filter((_, i) => i !== index);
    setReactants(newReactants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredReactants = reactants.filter((r) => r.trim() !== "");
    onSubmit(filteredReactants);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Enter Chemical Reactants
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {reactants.map((reactant, index) => (
            <div key={index} className="relative">
              <div className="flex items-center">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reactant {index + 1}
                  </label>
                  <input
                    type="text"
                    value={reactant}
                    onChange={(e) =>
                      handleReactantChange(index, e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter chemical formula (e.g., H2, O2)"
                  />
                </div>

                {reactants.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeReactant(index)}
                    className="ml-2 px-2 py-2 text-red-600 hover:text-red-800"
                    aria-label="Remove reactant"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              {suggestions.index === index &&
                suggestions.chemicals &&
                suggestions.chemicals.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1">
                      {suggestions.chemicals.map((chemical) => (
                        <li
                          key={chemical.id}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() =>
                            handleSuggestionClick(chemical.id, index)
                          }
                        >
                          {chemical.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ))}

          <div className="flex items-center">
            <button
              type="button"
              onClick={addReactant}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Reactant
            </button>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Calculate Reaction
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
