import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeCard from './components/RecipeCard';
import FilterBar from './components/FilterBar';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW: Filter States ---
  // Notice how we place the filter state in App, not inside FilterBar.
  // This is called "Lifting State Up" so we can push this state back down 
  // into FilterBar (via props) AND use it here in App to filter the `recipes` array.
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes?limit=50');
        if (!response.ok) throw new Error('Failed to fetch recipes 😞');
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // --- DERIVED DATA ---
  // We NEVER overwrite the `recipes` state directly when filtering. 
  // We calculate a NEW array 'displayedRecipes' on the fly during every render.

  // 1. Extract unique cuisines for the dropdown dynamically using Set
  const cuisines = [...new Set(recipes.map(r => r.cuisine))];

  // 2. Compute the filtered array
  let displayedRecipes = recipes.filter(recipe => {
    // Check search term (case-insensitive)
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Check cuisine
    const matchesCuisine = selectedCuisine === "" || recipe.cuisine === selectedCuisine;
    // Check difficulty
    const matchesDifficulty = selectedDifficulty === "" || recipe.difficulty === selectedDifficulty;

    return matchesSearch && matchesCuisine && matchesDifficulty;
  });

  // 3. Sort the filtered array (mutates the displayedRecipes array, which is fine since it's local)
  if (sortBy === "name") {
    // string comparison for alphabetical A-Z
    displayedRecipes.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "rating") {
    // numeric comparison, highest first
    displayedRecipes.sort((a, b) => b.rating - a.rating);
  }

  // 4. Reset Filters helper
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCuisine("");
    setSelectedDifficulty("");
    setSortBy("default");
  };

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />

        {/* Pass down all the states and their setter functions to FilterBar! */}
        <FilterBar
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine}
          selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}
          sortBy={sortBy} setSortBy={setSortBy}
          cuisines={cuisines} clearFilters={clearFilters}
        />

        <section className="recipes-section container" id="recipes">
          {/* Display match count dynamically */}
          <h2 className="section-title">
            {displayedRecipes.length > 0
              ? `Showing ${displayedRecipes.length} Recipes`
              : "No matches found."}
          </h2>

          {loading && <p className="status-msg">Loading delicious recipes... ⏳</p>}
          {error && <p className="status-msg error">Error: {error}</p>}

          {!loading && !error && (
            <div className="recipes-grid">
              {displayedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
