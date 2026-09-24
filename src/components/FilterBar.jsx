function FilterBar({
    searchTerm,
    setSearchTerm,
    selectedCuisine,
    setSelectedCuisine,
    selectedDifficulty,
    setSelectedDifficulty,
    sortBy,
    setSortBy,
    cuisines,
    clearFilters
}) {
    return (
        <div className="filter-bar container">
            {/* Search Input (Controlled Component) */}
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                // onChange fires whenever the user types. We update the parent's state.
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
            />

            {/* Cuisine Filter */}
            <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="filter-select"
            >
                <option value="">All Cuisines</option>
                {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
            </select>

            {/* Difficulty Filter */}
            <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
            >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            {/* Sort Options */}
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
            >
                <option value="default">Sort By...</option>
                <option value="name">Name (A-Z)</option>
                <option value="rating">Rating (Highest First)</option>
            </select>

            {/* Clear Filters Button */}
            <button onClick={clearFilters} className="clear-btn">
                Clear All
            </button>
        </div>
    );
}

export default FilterBar;
