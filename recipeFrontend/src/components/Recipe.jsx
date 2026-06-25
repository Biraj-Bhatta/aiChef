
function Recipe(props){

    const IngridentsList=props.recipeStore.ingredients.map(object => {
        return <li key={object.name}>{object.name} {object.quantity} {object.unit}</li>
    })

    const InstructionList=props.recipeStore.instructions.map(object=>{
        return <li key={object.step}>Step{object.step}: <span>{object.instruction}</span></li>
    })


    return(
        <section>
            <h2> AI Chef Recommens:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>{props.recipeStore.recipeName}.</strong></p>
                <h3>{props.recipeStore.recipeName}</h3>
                <p>{props.recipeStore.description}</p>
                <strong>Ingredients for {props.recipeStore.servings} servings:</strong>
                <ul>
                    {IngridentsList}
                </ul>
                <strong>Instructions:</strong>
                <ul>
                    {InstructionList}
                </ul>
            </article>
        </section>
    )
}
export default Recipe
