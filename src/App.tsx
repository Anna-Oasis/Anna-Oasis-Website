import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Toaster } from "sonner";


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

// Deputy Warden
import DeputyWardenDashboard from "./pages/DeputyWarden";
import DeputyWardenAdmissionsVerificationPage from "./pages/DeputyWarden/AdmissionVerification";
import DWAdmissionDetails from "./pages/DeputyWarden/AdmissionVerification/AdmissionDetails";
import DWRoomAllocationPage from "./pages/DeputyWarden/AdmissionVerification/RoomAllocation";
import DWFinalApprovalPage from "./pages/DeputyWarden/AdmissionVerification/FinalApproval";
import DeputyWardenVerificationsPage from "./pages/DeputyWarden/Verifications";
import DWRCManagementPage from "./pages/DeputyWarden/RCManagement";
import DeputyWardenGrievancesPage from "./pages/DeputyWarden/Grievances";
import GrievanceDetails from "./pages/DeputyWarden/Grievances/GrievanceDetails.";
import AttendanceReportsPage from "./pages/DeputyWarden/AttendanceReports";
import RCLeaveDetails from "./pages/DeputyWarden/RcLeave/RCLeaveDetails";
import RCLeavePage from "./pages/DeputyWarden/RcLeave";
import LeaveFormPage from "./pages/DeputyWarden/Verifications/LeaveForm";
import SummerVacationPage from "./pages/DeputyWarden/Verifications/SummerVacation";
import VacatingHostelPage from "./pages/DeputyWarden/Verifications/VacatingHostel";
import DWRoomsPage from "./pages/DeputyWarden/Rooms";

// Executive Warden
import AdmissionSessionPage from "./pages/ExecutiveWarden/AdmissionSession/index.tsx";
import AdmissionVerificationPage from "./pages/ExecutiveWarden/AdmissionVerification/index.tsx";
import DeclarationPage from "./pages/ExecutiveWarden/Declaration/index.tsx";
import EWRcLeavePage from "./pages/ExecutiveWarden/RcLeave/index.tsx";
import EWRCManagementPage from "./pages/ExecutiveWarden/RCManagement/index.tsx";
import EWRoomsPage from "./pages/ExecutiveWarden/Rooms/index.tsx";



import Login from "./pages/auth/Login";

import SIgnup from "./pages/auth/SIgnup";

import AdmissionForm from "./pages/Student/admission";
import DetailsPage from "./pages/Student/details";
import DetailsEditPage from "./pages/Student/detailsedit";
import GrievancesPage from "./pages/Student/Grievances";
import HostelVacationPage from "./pages/Student/HostelVacation";

import DeleteAccountPage from "@/pages/DeleteAccount";
import EmptyPage from "./components/EmptyPage";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/landing";

import StudentLeaveFormPage from "./pages/Student/leaveform";
import StudentSummerVacationPage from "./pages/Student/summerVacation";
import StudentDashboard from "./pages/Student/Dashboard";

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
            path="/User/Student"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <StudentDashboard />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />
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
          <Route
            path="/User/Student/leave"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <StudentLeaveFormPage />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />

          <Route
            path="/User/Student/summer-vacation"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <StudentSummerVacationPage />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />

          <Route
            path="/User/Student/Grievances"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <GrievancesPage />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />

          <Route
            path="/User/Student/HostelVacation"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <HostelVacationPage />
                  </MainLayout>
                }
                roles={["student"]}
              />
            }
          />

          {/* ================= RC ROUTES ================= */}
          {/* ================= RC ROUTES ================= */}

<Route
  path="/RC"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCDashboard />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/Details"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCDetailsPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/Details/Edit"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCDetailsEditPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/Students"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCStudentsPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/StudentVerification/LeaveForm"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCLeaveFormApprovalPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/StudentVerification/Grievances"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCGrievanceApprovalPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/StudentVerification/SummerVacation"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCSummerVacationApprovalPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/StudentVerification/VacatingHostel"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCVacatingHostelApprovalPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/Rooms"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCRoomsPage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/Attendance"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCAttendancePage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

<Route
  path="/RC/ApplyForLeave"
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <RCApplyForLeavePage />
        </MainLayout>
      }
      roles={["rc"]}
    />
  }
/>

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
            path="/DeputyWarden"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DeputyWardenDashboard />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/AdmissionVerification"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DeputyWardenAdmissionsVerificationPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/AdmissionVerification/:id"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DWAdmissionDetails />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/AdmissionVerification/:id/RoomAllocation"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DWRoomAllocationPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/AdmissionVerification/:id/FinalApproval"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DWFinalApprovalPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/Verifications"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DeputyWardenVerificationsPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/Verifications/Leave"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <LeaveFormPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/Verifications/SummerVacation"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <SummerVacationPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/Verifications/VacatingHostel"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <VacatingHostelPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/Grievances"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DeputyWardenGrievancesPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/Grievances/:id"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <GrievanceDetails />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/RCManagement"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DWRCManagementPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/AttendanceReports"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <AttendanceReportsPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/RcLeave"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <RCLeavePage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/RcLeave/:id"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <RCLeaveDetails />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />
          <Route
            path="/DeputyWarden/Rooms"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <DWRoomsPage />
                  </MainLayout>
                }
                roles={["deputyWarden"]}
              />
            }
          />

          {/* ================= EXECUTIVE WARDEN ROUTES ================= */}
          <Route
            path="/ExecutiveWarden"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <Outlet />
                  </MainLayout>
                }
                roles={["executiveWarden"]}
              />
            }
          >
            <Route index element={<AdmissionSessionPage />} />
            <Route
              path="admission-session"
              element={<AdmissionSessionPage />}
            />
            <Route
              path="admission-verification/:hostelBlock/:academicYear"
              element={<AdmissionVerificationPage />}
            />
            <Route path="declaration" element={<DeclarationPage />} />
            <Route path="rc-leave" element={<EWRcLeavePage />} />
            <Route path="rc-management" element={<EWRCManagementPage />} />
            <Route path="rooms" element={<EWRoomsPage />} />
          </Route>

          {/* ================= FALLBACK ROUTES ================= */}
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
