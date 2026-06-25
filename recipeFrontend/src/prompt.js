export const createRecipePrompt = (ingredients) => `
You are an expert chef and recipe creator.

TASK:
Create the best possible recipe using the ingredients provided by the user.

USER INGREDIENTS:
${ingredients.join(", ")}

RULES:
1. Use the provided ingredients as the primary ingredients.
2. You may add common pantry ingredients only when necessary.
3. Include exact quantities and units for every ingredient.
`;
