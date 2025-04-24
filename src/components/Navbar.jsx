import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/add-trip">Add Trip</Link>
    </nav>
  );
}
export default Navbar;
