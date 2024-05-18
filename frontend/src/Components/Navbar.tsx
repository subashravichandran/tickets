import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
        <Link to="/">Habits</Link>
        <Link to="/habits/new">New Habit</Link>
    </nav>
  );
}

export default NavBar