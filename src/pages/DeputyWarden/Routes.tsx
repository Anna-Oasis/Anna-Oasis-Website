import DeputyWardenHomePage from "./home";
import DeputyWardenLeaveFormVerificationPage from "./Verifications/leaveForm";
import DeputyWardenSummerVacationVerificationPage from "./Verifications/summerVacation";
import DeputyWardenVacatingHostelVerificationPage from "./Verifications/vacatingHostel";
import DeputyWardenRoomViewPage from "./Room";
import DeputyWardenRCManagementPage from "./RCManagement";
import DeputyWardenRCLeaveManagementPage from "./RCLeave";
import DeputyWardenGrievancesManagementPage from "./Grievances";
import DeputyWardenAttendanceReportPage from "./AttendanceReport";
import DeputyWardenAdmissionsVerificationPage from "./Verifications/AdmissionVerfication";


export const deputyWardenRoutes = [
  { path: "/DeputyWarden", element: <DeputyWardenHomePage /> },
  { path: "/DeputyWarden/Verification/LeaveForm", element: <DeputyWardenLeaveFormVerificationPage /> },
  { path: "/DeputyWarden/Verification/SummerVacation", element: <DeputyWardenSummerVacationVerificationPage /> },
  { path: "/DeputyWarden/Verification/VacatingHostel", element: <DeputyWardenVacatingHostelVerificationPage /> },
  { path: "/DeputyWarden/RoomView", element: <DeputyWardenRoomViewPage /> },
  { path: "/DeputyWarden/RCManagement", element: <DeputyWardenRCManagementPage /> },
  { path: "/DeputyWarden/RCLeaveManagement", element: <DeputyWardenRCLeaveManagementPage /> },
  { path: "/DeputyWarden/Grievances", element: <DeputyWardenGrievancesManagementPage /> },
  { path: "/DeputyWarden/AttendanceReport", element: <DeputyWardenAttendanceReportPage /> },
  { path: "/DeputyWarden/Verification/AdmissionVerification", element: <DeputyWardenAdmissionsVerificationPage /> },
];
