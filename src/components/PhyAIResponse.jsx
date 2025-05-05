import OpenAI from "openai";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

export const PhyAIResponse = async (values) => {
  const prompt = `
You are a physics expert. A student provides the following known values for a projectile motion:
${Object.entries(values)
  .map(([k, v]) => `${k}: ${v}`)
  .join("\n")}

Using appropriate projectile motion formulas, calculate all other possible missing values. Take g (acceleration due to gravity) = 9.8 m/s^2.

Return ONLY a valid JSON object using the following format (without any explanation or markdown):

{
  "formulas_used": ["<formula1>", "<formula2>", ...],
  "results": {
    "u": "<initial velocity in m/s>",
    "angle": "<angle in degrees>",
    "h": "<height in meters>",
    "R": "<Range in meters>",
    "T": "<Time of Flight in seconds>"
  },
  "tip": "<a 1-2 line helpful tip or edge case to consider while solving projectile problems>"
}
`;

  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful physics assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.4,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName,
  });

  console.log("AI Response:", response.choices[0].message.content);
  try {
    let raw = response.choices[0].message.content.trim();
    if (raw.startsWith("```")) {
      raw = raw
        .replace(/```(?:json)?\n?/, "")
        .replace(/```$/, "")
        .trim();
    }

    return JSON.parse(raw);
  } catch (err) {
    console.error("Error parsing OpenAI response:", err);
    throw new Error("AI could not interpret the result.");
  }
};
