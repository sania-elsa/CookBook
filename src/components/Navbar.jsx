function Navbar() {
    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <h1 className="logo">🍽️ CookBook</h1>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#recipes">Recipes</a></li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;
