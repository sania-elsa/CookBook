
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeCard from './components/RecipeCard';

function App() {
  const sampleRecipe = {
    title: "Classic Margherita Pizza",
    description: "A simple and delicious Italian classic with fresh tomatoes, mozzarella cheese, and basil.",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="app-container">
      { }
      <Navbar />

      <main>
        <Hero />

        <section className="recipes-section container" id="recipes">
          <h2 className="section-title">Featured Recipe</h2>

          { }
          <RecipeCard recipe={sampleRecipe} />
        </section>
      </main>
    </div>
  );
}

export default App;
