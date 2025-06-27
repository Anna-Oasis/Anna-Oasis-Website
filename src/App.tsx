import { BrowserRouter, Route, Routes } from "react-router"
import Addmission from "./pages/addmission"
import Home from "./pages/home"
import RoomAllocationPage from "./pages/RC/RoomAllocation/allocation"
import ApprovePage from "./pages/RC/RoomAllocation/approve/approve"
import ManagerPaymentVerificationsPage from "./pages/Manager/paymentVerification"
import DeputyWardenAdmissionsVerificationPage from "./pages/DeputyWarden/Verifications/AdmissionVerfication"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admissionForm" element={<Addmission/>} />
        <Route path="/RC/RoomAllocation" element={<RoomAllocationPage/>} />
        <Route path="/RC/RoomAllocation/Approve/:id" element={<ApprovePage/>} />
        <Route path="/Manager/PaymentVerfication" element={<ManagerPaymentVerificationsPage/>} />
        <Route path="/DeputyWarden/Verification/AdmissionVerification" element={<DeputyWardenAdmissionsVerificationPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
