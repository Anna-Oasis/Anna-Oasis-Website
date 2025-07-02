import { BrowserRouter, Route, Routes } from "react-router";
import Addmission from "./pages/addmission";
import Home from "./pages/home";
import RoomAllocationPage from "./pages/RC/RoomAllocation/allocation";
import ApprovePage from "./pages/RC/RoomAllocation/approve/approve";
import ManagerPaymentVerificationsPage from "./pages/Manager/paymentVerification";
import DeputyWardenAdmissionsVerificationPage from "./pages/DeputyWarden/Verifications/AdmissionVerfication";
import Login from "./pages/auth/Login";
import SIgnup from "./pages/auth/SIgnup";
import EmptyPage from "./components/EmptyPage";
import ProtectedLayout from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SIgnup />} />
        <Route path="*" element={<EmptyPage title="404" description="Page not found" />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<ProtectedLayout roles={["student"]} />}>
          <Route path="/admissionForm" element={<Addmission />} />
          <Route path="/User/Student" element={<div className="text-center mt-10">Student Dashboard</div>} />
        </Route>

        <Route element={<ProtectedLayout roles={["rc"]} />}>
          <Route path="/RC/RoomAllocation" element={<RoomAllocationPage />} />
          <Route path="/RC/RoomAllocation/Approve/:id" element={<ApprovePage />} />
        </Route>

        <Route element={<ProtectedLayout roles={["manager"]} />}>
          <Route path="/Manager/PaymentVerfication" element={<ManagerPaymentVerificationsPage />} />
        </Route>

        <Route element={<ProtectedLayout roles={["DeputyWarden"]} />}>
          <Route
            path="/DeputyWarden/Verification/AdmissionVerification"
            element={<DeputyWardenAdmissionsVerificationPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
