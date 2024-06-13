import { Container } from "react-bootstrap"
import Dashboard from "./Components/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css'
// import LoginForm from './Components/LoginForm'
// import Vite from './Vite'
// import axios from 'axios'
// <Vite />

function App() {

  return (
    <div className='main-content'>
      <Container className="full-cover">
        <Dashboard />
      </Container>
    </div>
  )
}

export default App
