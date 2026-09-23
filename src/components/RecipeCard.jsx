function RecipeCard({ recipe }) {
    // We calculate total time by combining prep and cook time provided by the API
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    return (
        <div className="card">
            {/* Notice that we are using recipe.name instead of recipe.title because DummyJSON uses 'name' */}
            <img src={recipe.image} alt={recipe.name} className="card-img" />

            <div className="card-content">
                <h3 className="card-title">{recipe.name}</h3>
                {/* We map the remaining properties to display cuisine, difficulty, etc. */}
                <p className="card-desc">
                    <strong>Cuisine:</strong> {recipe.cuisine} • {recipe.difficulty}
                </p>
                <p className="card-desc">
                    ⭐ {recipe.rating} | 🕒 {totalTime} mins total
                </p>
            </div>
        </div>
    );
}

export default RecipeCard;
