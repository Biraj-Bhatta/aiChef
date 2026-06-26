const { getRecipe } = require("./gemini.js");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



app.post("/api/chat", async (req, res) => {
    console.log("Request received");
    console.log(req.body);
    try {
        const { ingredients } = req.body;
        const generatedRecipe = await getRecipe(ingredients);


        res.json(generatedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error"
        });
    }
});
module.exports = app;
