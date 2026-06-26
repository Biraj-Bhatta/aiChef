import { useState } from "react"
import IngridentList from './IngridentList.jsx'
import Recipe from './Recipe.jsx'


function Main(){
    const [ingridents, setIngridents]=useState([])

    function addIngrident(formData){
        const newIngrident=formData.get("ingrident")
        if (newIngrident !=""){
            setIngridents( prevIngridents => [ ...prevIngridents, newIngrident ] )
        }
    }

    //state to show Loading for api call
    const[isLoading,setIsLoading]=useState(false)

    // state to save the recipe from Gemini
    const [recipeStore, setRecipeStore]=useState(false)


    const API_URL = import.meta.env.VITE_API_URL;

    const getRecipeGemini = async () => {
        setIsLoading(true);
        setRecipeStore(null);
        try {
            const response = await fetch(
                `${API_URL}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ingredients: ingridents
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Server error");
            }

            const generatedRecipe = await response.json();
            setRecipeStore(generatedRecipe);

        } catch (error) {
            console.error(error);
            alert("Failed to generate recipe");
        } finally {
            setIsLoading(false);
        }
    };

    //This Part is for calling the API from frontend 
    // Note:Don't call api from frontend can be seen in header in console easily 
    // always make a backend for it.



    // //Fuction handles the response 
    // const getRecipeGemini = async() => {
    //     setIsLoading(true)
    //     //set previous recipe stored to null
    //     setRecipeStore(null)
    //     try{
    //         const generatedRecipe = await getRecipe(ingridents)
    //         setRecipeStore(generatedRecipe)
    //     }catch{
    //         console.error("Caught error in Main.jsx:", error.message);
    //         alert("The kitchen is busy! The AI failed to cook up a recipe. Please try again.");
    //     }finally{
    //         setIsLoading(false)
    //     }
    // }

    return (
        <>
            <main>
                <form  action={addIngrident} className="add-ingrident-form">
                    <input name="ingrident" aria-label="Add ingrident" type="text" placeholder="e.g. Orange"/>
                    <button> Add ingrident </button>
                </form>

                {ingridents.length ? <IngridentList
                    ingridents={ingridents}
                    getRecipeGemini={getRecipeGemini}
                    onClick={getRecipeGemini}
                    isLoading={isLoading}
                /> : null }


                {recipeStore ? <Recipe recipeStore={recipeStore}/> : null}

            </main>
        </>
    )
}
export default Main
