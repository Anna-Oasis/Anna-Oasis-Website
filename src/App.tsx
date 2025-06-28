import { BrowserRouter, Route, Routes } from "react-router"
import Addmission from "./pages/addmission"
import DetailsEditPage from "./pages/detailsedit"
import Detailspage from "./pages/details"
import Admission from "./pages/admission"
import Home from "./pages/home"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admissionForm" element={<Addmission/>} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/detailsedit" element={<DetailsEditPage />} />
        <Route path="/details" element={<Detailspage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
