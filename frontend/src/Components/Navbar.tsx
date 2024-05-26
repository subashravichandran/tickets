import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
        <Link to="/todo_lists">Todo's</Link>
    </nav>
  );
}

export default NavBar