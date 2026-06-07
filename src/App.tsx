import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Addmission from "./pages/addmission";
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

// Executive Warden Sub-page Imports
import AdmissionSessionPage from "./pages/ExecutiveWarden/AdmissionSession/index.tsx";
import AdmissionVerificationPage from "./pages/ExecutiveWarden/AdmissionVerification/index.tsx";
import DeclarationPage from "./pages/ExecutiveWarden/Declaration/index.tsx";
import RcLeavePage from "./pages/ExecutiveWarden/RcLeave/index.tsx";
import RCManagementPage from "./pages/ExecutiveWarden/RCManagement/index.tsx";
import RoomsPage from "./pages/ExecutiveWarden/Rooms/index.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SIgnup />} />
          <Route path="/DeleteAccount" element={<DeleteAccountPage />} />

          {/* ================= STUDENT ROUTES ================= */}
          <Route
            path="/admissionForm"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <Addmission />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />
          <Route
            path="/User/Student/admission"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <AdmissionForm />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />
          <Route
            path="/User/Student/details"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DetailsPage />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />
          <Route
            path="/User/Student/details/edit"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DetailsEditPage />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />

          {/* ================= RC ROUTES ================= */}
          <Route
            path="/RC/RoomAllocation"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <RoomAllocationPage />
                  </MainLayout>
                }
                roles={["rc"]}
              />
            }
          />
          <Route
            path="/RC/RoomAllocation/Approve/:id"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <ApprovePage />
                  </MainLayout>
                }
                roles={["rc"]}
              />
            }
          />

          {/* ================= MANAGER ROUTES ================= */}
          <Route
            path="/Manager/PaymentVerfication"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <ManagerPaymentVerificationsPage />
                  </MainLayout>
                }
                roles={["manager"]}
              />
            }
          />

          {/* ================= DEPUTY WARDEN ROUTES ================= */}
          <Route
            path="/DeputyWarden/Verification/AdmissionVerification"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DeputyWardenAdmissionsVerificationPage />
                  </MainLayout>
                }
                roles={["DeputyWarden"]}
              />
            }
          />

          {/* ================= EXECUTIVE WARDEN SUB-ROUTES ================= */}
          <Route
            path="/ExecutiveWarden"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    {/* The Outlet renders whatever child route is active */}
                    <Outlet />
                  </MainLayout>
                }
                roles={["executiveWarden"]}
              />
            }
          >
            {/* Default fallback view if navigating exactly to /ExecutiveWarden */}
            <Route index element={<AdmissionSessionPage />} />

            {/* Sub-routes mapping directly to your workspace folders */}
            <Route
              path="admission-session"
              element={<AdmissionSessionPage />}
            />
            <Route
              path="admission-verification/:hostelBlock/:academicYear"
              element={<AdmissionVerificationPage />}
            />
            <Route path="declaration" element={<DeclarationPage />} />
            <Route path="rc-leave" element={<RcLeavePage />} />
            <Route path="rc-management" element={<RCManagementPage />} />
            <Route path="rooms" element={<RoomsPage />} />
          </Route>

          {/* ================= FALLBACK ERROR ROUTES ================= */}
          <Route
            path="/404"
            element={<EmptyPage title="404" description="page not found" />}
          />
          <Route
            path="*"
            element={<EmptyPage title="404" description="page not found" />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
