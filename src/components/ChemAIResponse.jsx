import OpenAI from "openai";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

export const ChemAIResponse = async (reactants) => {
  const prompt = `
  You are a chemistry expert. Balance the chemical reaction between these reactants: ${reactants.join(
    ", "
  )}.
  Return the output in this format (JSON):
  {
    "equation": "<balanced equation>",
    "products": ["<product1>", "<product2>", ...],
    "description": "<1-2 line explanation of the reaction>"
  }`;

  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful chemistry assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.4,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName,
  });

  try {
    let raw = response.choices[0].message.content.trim();

    if (raw.startsWith("```")) {
      raw = raw.replace(/```(?:json)?\n?/, "").replace(/```$/, "").trim();
    }

    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Error parsing OpenAI response:", err);
    throw new Error("AI could not interpret the result.");
  }
};
