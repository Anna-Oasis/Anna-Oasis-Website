import { BrowserRouter, Route, Routes } from "react-router";
import Addmission from "./pages/addmission";
import RCDashboard from "./pages/RC/Dashboard";
import RCDetailsPage from "./pages/RC/Details";
import RCDetailsEditPage from "./pages/RC/Details/Edit";
import RCStudentsPage from "./pages/RC/Students";
import RCLeaveFormApprovalPage from "./pages/RC/StudentVerification/LeaveForm";
import RCGrievanceApprovalPage from "./pages/RC/StudentVerification/Grievances";
import RCSummerVacationApprovalPage from "./pages/RC/StudentVerification/SummerVacation";
import RCVacatingHostelApprovalPage from "./pages/RC/StudentVerification/VacatingHostel";
import RCRoomsPage from "./pages/RC/Rooms";
import RCAttendancePage from "./pages/RC/Attendance";
import RCApplyForLeavePage from "./pages/RC/ApplyForLeave";
import RoomAllocationPage from "./pages/RC/RoomAllocation/allocation";
import ApprovePage from "./pages/RC/RoomAllocation/approve/approve";
import ManagerPaymentVerificationsPage from "./pages/Manager/paymentVerification";
import DeputyWardenAdmissionsVerificationPage from "./pages/DeputyWarden/Verifications/AdmissionVerfication";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SIgnup from "./pages/auth/SIgnup";
import EmptyPage from "./components/EmptyPage";
import AdmissionForm from "./pages/Student/admission";
import DetailsPage from "./pages/Student/details";
import DetailsEditPage from "./pages/Student/detailsedit";
import DeleteAccountPage from "@/pages/DeleteAccount";
import MainLayout from "./components/MainLayout";
import Landing from "./pages/landing";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admissionForm" element={<ProtectedRoute element={<MainLayout><Addmission /></MainLayout>} roles={["student"]} />} />
          <Route path="/RC" element={<ProtectedRoute element={<MainLayout><RCDashboard /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/Details" element={<ProtectedRoute element={<MainLayout><RCDetailsPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/Details/Edit" element={<ProtectedRoute element={<MainLayout><RCDetailsEditPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/Students" element={<ProtectedRoute element={<MainLayout><RCStudentsPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/StudentVerification/LeaveForm" element={<ProtectedRoute element={<MainLayout><RCLeaveFormApprovalPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/StudentVerification/Grievances" element={<ProtectedRoute element={<MainLayout><RCGrievanceApprovalPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/StudentVerification/SummerVacation" element={<ProtectedRoute element={<MainLayout><RCSummerVacationApprovalPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/StudentVerification/VacatingHostel" element={<ProtectedRoute element={<MainLayout><RCVacatingHostelApprovalPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/Rooms" element={<ProtectedRoute element={<MainLayout><RCRoomsPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/Attendance" element={<ProtectedRoute element={<MainLayout><RCAttendancePage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/ApplyForLeave" element={<ProtectedRoute element={<MainLayout><RCApplyForLeavePage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/RoomAllocation" element={<ProtectedRoute element={<MainLayout><RoomAllocationPage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/RC/RoomAllocation/Approve/:id" element={<ProtectedRoute element={<MainLayout><ApprovePage /></MainLayout>} roles={["rc"]} />} />
          <Route path="/Manager/PaymentVerfication" element={<ProtectedRoute element={<MainLayout><ManagerPaymentVerificationsPage /></MainLayout>} roles={["manager"]} />} />
          <Route path="/DeputyWarden/Verification/AdmissionVerification" element={<ProtectedRoute element={<MainLayout><DeputyWardenAdmissionsVerificationPage /></MainLayout>} roles={["DeputyWarden"]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SIgnup />} />
          <Route path="/User/Student/admission" element={<ProtectedRoute element={<MainLayout><AdmissionForm /></MainLayout>} roles={["student"]} />} />
          <Route path="/User/Student/details" element={<ProtectedRoute element={<MainLayout><DetailsPage /></MainLayout>} roles={["student"]} />} />
          <Route path="/User/Student/details/edit" element={<ProtectedRoute element={<MainLayout><DetailsEditPage /></MainLayout>} roles={["student"]} />} />
          <Route path="/DeleteAccount" element={<DeleteAccountPage />} />
          <Route path="/404" element={<EmptyPage title="404" description="page not found" />} />
          <Route path="*" element={<EmptyPage title="404" description="page not found" />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
