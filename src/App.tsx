import { BrowserRouter, Route, Routes } from "react-router";
import Addmission from "./pages/addmission";
import RoomAllocationPage from "./pages/RC/RoomAllocation/allocation";
import ApprovePage from "./pages/RC/RoomAllocation/approve/approve";
import ManagerPaymentVerificationsPage from "./pages/Manager/paymentVerification";
import DeputyWardenAdmissionsVerificationPage from "./pages/DeputyWarden/Verifications/AdmissionVerfication";
import GrievancesPage from "./pages/Manager/Grievances";
import DetailsPage from "./pages/Manager/detailsPage";
import Login from "./pages/auth/Login"
import VacatingHostel from "./pages/Manager/vacatingHostel";
import AttendancePage from "./pages/Manager/attendancePage";
import ProtectedRoute from "./components/ProtectedRoute";
import SIgnup from "./pages/auth/SIgnup";
import EmptyPage from "./components/EmptyPage";
import AdmissionForm from "./pages/Student/admission";
import DetailsEditPage from "./pages/Student/detailsedit";
import DeleteAccountPage from "@/pages/DeleteAccount";
import MainLayout from "./components/MainLayout";
import Landing from "./pages/landing";
import { Toaster } from "sonner";
import DeclarationsPage from "./pages/Manager/declarationPage";
import ManagerAdmissionsVerificationPage from "./pages/Manager/admissionVerification";
import AdmissionApprovalsPage from "./pages/Manager/AdmissionApproval";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/admissionForm"
          element={<ProtectedRoute element={<MainLayout><Addmission /></MainLayout>} roles={["student"]} />}
        />
        <Route
          path="/RC/RoomAllocation"
          element={<ProtectedRoute element={<MainLayout><RoomAllocationPage /></MainLayout>} roles={["rc"]} />}
        />
        <Route
          path="/RC/RoomAllocation/Approve/:id"
          element={<ProtectedRoute element={<MainLayout><ApprovePage /></MainLayout>} roles={["rc"]} />}
        />
        <Route
          path="/Manager/PaymentVerification"
          element={
            <ProtectedRoute
              element={<MainLayout><ManagerPaymentVerificationsPage /></MainLayout>}
              roles={["manager"]}
            />
          }
        />
         <Route
          path="/Manager/Grievances"
          element={
            <ProtectedRoute
              element={<MainLayout><GrievancesPage /></MainLayout>}
              roles={["manager"]}
            />
          }
        />
         <Route
          path="/Manager/Details"
          element={
            <ProtectedRoute
              element={<MainLayout><DetailsPage /></MainLayout>}
              roles={["manager"]}
            />
          }
        />
         <Route
          path="/Manager/Attendance"
          element={
            <ProtectedRoute
              element={<MainLayout><AttendancePage /></MainLayout>}
              roles={["manager"]}
            />
          }
        />
          <Route
          path="/Manager/VacatingHostel"
          element={
            <ProtectedRoute
              element={<MainLayout><VacatingHostel /></MainLayout>}
              roles={["manager"]}
            />
          }
        />

         <Route
          path="/Manager/Declaration"
          element={
            <ProtectedRoute
              element={<MainLayout><DeclarationsPage /></MainLayout>}
              roles={["manager"]}
            />
          }
        />

          <Route
          path="/Manager/Verification/AdmissionVerification"
          element={
            <ProtectedRoute
              element={<MainLayout><ManagerAdmissionsVerificationPage /></MainLayout>}
              roles={["manager"]}
            />
          }
        />

         <Route
          path="/Manager/AdmissionApproval"
          element={
            <ProtectedRoute
              element={<MainLayout><AdmissionApprovalsPage /></MainLayout>}
              roles={["manager"]}
            />
          }
        />

        <Route
          path="/DeputyWarden/Verification/AdmissionVerification"
          element={
            <ProtectedRoute
              element={<MainLayout><DeputyWardenAdmissionsVerificationPage /></MainLayout>}
              roles={["DeputyWarden"]}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SIgnup />} />
        <Route
          path="/User/Student/admission"
          element={
            <ProtectedRoute
              element={<MainLayout><AdmissionForm /></MainLayout>}
              roles={["student"]}
            />
          }
        />
        <Route
          path="/User/Student/details"
          element={
            <ProtectedRoute
              element={<MainLayout><DetailsPage /></MainLayout>}
              roles={["student"]}
            />
          }
        />
        <Route
          path="/User/Student/details/edit"
          element={
            <ProtectedRoute
              element={<MainLayout><DetailsEditPage /></MainLayout>}
              roles={["student"]}
            />
          }
        />
  <Route path="/DeleteAccount" element={<DeleteAccountPage />} />
        <Route path="/404" element={<EmptyPage title="404" description="page not found" />} />
        <Route path="*" element= {<EmptyPage title="404" description="page not found" />} />
      </Routes>
    </BrowserRouter>
    <Toaster richColors position="top-center"/>
    </>
  );
}

export default App;
