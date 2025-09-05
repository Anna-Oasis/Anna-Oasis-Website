import { BrowserRouter, Route, Routes } from "react-router";
import Addmission from "./pages/addmission";
import RoomAllocationPage from "./pages/RC/RoomAllocation/allocation";
import ApprovePage from "./pages/RC/RoomAllocation/approve/approve";
import ManagerPaymentVerificationsPage from "./pages/Manager/paymentVerification";
import DeputyWardenAdmissionsVerificationPage from "./pages/DeputyWarden/Verifications/AdmissionVerfication";
import Login from "./pages/auth/Login"
import ProtectedRoute from "./components/ProtectedRoute";
import SIgnup from "./pages/auth/SIgnup";
import EmptyPage from "./components/EmptyPage";
import AdmissionForm from "./pages/Student/admission";
import DetailsPage from "./pages/Student/details";
import DetailsEditPage from "./pages/Student/detailsedit";
import DeleteAccountPage from "@/pages/DeleteAccount";
import GrievancesPage from "./pages/Student/Grievances";
import SummerVacationPage from "./pages/Student/SummerVacation";
import HostelVacationPage from "./pages/Student/HostelVacation";
import LeaveFormPage from "./pages/Student/LeaveForm";
import MainLayout from "./components/MainLayout";
import Landing from "./pages/landing";
import { Toaster } from "sonner";

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
          path="/Manager/PaymentVerfication"
          element={
            <ProtectedRoute
              element={<MainLayout><ManagerPaymentVerificationsPage /></MainLayout>}
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
        <Route
          path="/User/Student/Grievances"
          element={
            <ProtectedRoute
              element={<MainLayout><GrievancesPage /></MainLayout>}
              roles={["student"]}
            />
          }
        />
        <Route
          path="/User/Student/SummerVacation"
          element={
            <ProtectedRoute
              element={<MainLayout><SummerVacationPage /></MainLayout>}
              roles={["student"]}
            />
          }
        />
        <Route
          path="/User/Student/HostelVacation"
          element={
            <ProtectedRoute
              element={<MainLayout><HostelVacationPage /></MainLayout>}
              roles={["student"]}
            />
          }
        />
        <Route
          path="/User/Student/LeaveForm"
          element={
            <ProtectedRoute
              element={<MainLayout><LeaveFormPage /></MainLayout>}
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
