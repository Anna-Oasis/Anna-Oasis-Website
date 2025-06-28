import { BrowserRouter, Route, Routes } from "react-router";
import Addmission from "./pages/addmission";
import Home from "./pages/home";
import RoomAllocationPage from "./pages/RC/RoomAllocation/allocation";
import ApprovePage from "./pages/RC/RoomAllocation/approve/approve";
import ManagerPaymentVerificationsPage from "./pages/Manager/paymentVerification";
import DeputyWardenAdmissionsVerificationPage from "./pages/DeputyWarden/Verifications/AdmissionVerfication";
import Login from "./pages/auth/Login"
import ProtectedRoute from "./components/ProtectedRoute";
import SIgnup from "./pages/auth/SIgnup";
import EmptyPage from "./components/EmptyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/admissionForm"
          element={<ProtectedRoute element={<Addmission />} roles={["student"]} />}
        />
        <Route
          path="/RC/RoomAllocation"
          element={<ProtectedRoute element={<RoomAllocationPage />} roles={["rc"]} />}
        />
        <Route
          path="/RC/RoomAllocation/Approve/:id"
          element={<ProtectedRoute element={<ApprovePage />} roles={["rc"]} />}
        />
        <Route
          path="/Manager/PaymentVerfication"
          element={
            <ProtectedRoute
              element={<ManagerPaymentVerificationsPage />}
              roles={["manager"]}
            />
          }
        />
        <Route
          path="/DeputyWarden/Verification/AdmissionVerification"
          element={
            <ProtectedRoute
              element={<DeputyWardenAdmissionsVerificationPage />}
              roles={["DeputyWarden"]}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SIgnup />} />
        <Route
          path="/User/Student"
          element={
            <ProtectedRoute
              element={<div className="text-center mt-10">Student Dashboard</div>}
              roles={["student"]}
            />
          }
        />
        <Route path="*" element= {<EmptyPage title="404" description="page not found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
