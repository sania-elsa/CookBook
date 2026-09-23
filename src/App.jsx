// 1. We import React's hooks: useState for managing state, useEffect for side-effects (like APIs).
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeCard from './components/RecipeCard';

function App() {
  // 2. We declare state variables.
  // recipes: holds the fetched array (initially empty)
  const [recipes, setRecipes] = useState([]);
  // loading: track if we are currently fetching data
  const [loading, setLoading] = useState(true);
  // error: track if any error occurred during the fetch
  const [error, setError] = useState(null);

  // 3. useEffect tells React to do something AFTER rendering.
  useEffect(() => {
    // We define an async function inside because the useEffect callback itself cannot be async.
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes 😞');
        }

        const data = await response.json();
        // Since the API returns an object { recipes: [...] }, we access the .recipes array
        setRecipes(data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading animation whether success or fail
      }
    };

    // Execute our fetch!
    fetchRecipes();
  }, []); // 4. The empty dependency array means "only run this ONCE after the first load"

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <Hero />

        <section className="recipes-section container" id="recipes">
          <h2 className="section-title">All Recipes</h2>

          {/* 5. Conditional Rendering: show messages based on React state */}
          {loading && <p className="status-msg">Loading delicious recipes... ⏳</p>}

          {error && <p className="status-msg error">Error: {error}</p>}

          {/* 6. If not loading and no error, render the grid of cards mapping over our recipes state */}
          {!loading && !error && (
            <div className="recipes-grid">
              {recipes.map((recipe) => (

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
