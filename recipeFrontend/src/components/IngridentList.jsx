
function IngridentList(props){
    const ingridentListItems=props.ingridents.map((ingrident, index) => (
        <li key={index}>{ingrident}</li>
    ))



    return(
        <section>
            <h2>Ingridents Available:</h2>
            <ul className="ingrident-list"> {ingridentListItems} </ul>
            {props.ingridents.length > 3 ?<div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingridents.</p>
                </div>
                <button 
                    className={`submit-btn ${props.isLoading ? 'loading' : ''}`}
                    onClick={props.onClick}
                    disabled={props.isLoading}
                >
                    {props.isLoading ? (
                        <span className="spinner-container">
                            <span className="spinner"></span> Generating...
                        </span>
                    ) : (
                            "Get a recipe"
                        )}
                </button>
            </div> : null}
        </section>
    )
}

export default IngridentList
