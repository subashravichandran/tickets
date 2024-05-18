import { BrowserRouter as Router  } from "react-router-dom";
import NavBar from "./Navbar";
import AppRoutes from "./AppRoutes";

export default function Dashboard() {
  return (
    <Router>
      <h2>Dashboard</h2>
      <NavBar />
      <AppRoutes />
    </Router>
  )
}