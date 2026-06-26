const { getRecipe } = require("./gemini.js");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/api/chat", async (req, res) => {
    console.time("recipe");

    try {
        const { ingredients } = req.body;

        const generatedRecipe = await getRecipe(ingredients);
        console.timeEnd("recipe");


        res.json(generatedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error"
        });
    }
});
module.exports = app;
