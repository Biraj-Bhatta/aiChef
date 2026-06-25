require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const { createRecipePrompt } = require("./prompt.js");   


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


async function getRecipe(ingredients) {
    const prompt=createRecipePrompt(ingredients);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                //response schema

                responseSchema: {
                    type: "OBJECT", // Changed Type.OBJECT to "OBJECT"
                    properties: {
                        recipeName: { type: "STRING" },
                        description: { type: "STRING" },
                        servings: { type: "INTEGER" },
                        ingredients: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    name: { type: "STRING" },
                                    quantity: { type: "NUMBER" },
                                    unit: { type: "STRING" },
                                },
                                required: ["name", "quantity", "unit"],
                            },
                        },
                        instructions: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    step: { type: "INTEGER" },
                                    instruction: { type: "STRING" },
                                },
                                required: ["step", "instruction"],
                            },
                        },
                    },
                    required: ["recipeName", "description", "servings", "ingredients", "instructions"],
                },
            },
        }); 
        return JSON.parse(response.text)
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    getRecipe
};
