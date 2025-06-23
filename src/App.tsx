import { BrowserRouter, Route, Routes } from "react-router"
import Addmission from "./pages/addmission"
import Home from "./pages/home"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admissionForm" element={<Addmission/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
