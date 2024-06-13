import { BrowserRouter as Router  } from "react-router-dom";
import NavBar from "./Navbar";
import AppRoutes from "./AppRoutes";
import '../App.css'

export default function Dashboard() {
  return (
    <Router>
      <NavBar />
      <AppRoutes />
    </Router>
  )
}