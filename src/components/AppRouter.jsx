
import { Routes, Route } from "react-router-dom";
import AssignmentsTable from "./AssignmentsTable";
import ClassWork from "./ClassWork";
import Dashboard from "./DashBoard";
import RecordedSession from "./RecordedSession";
import Marie from "./Marie";
import OtpVerification from "./OtpVerfication";
import Login from './Login';
import AddPassword from "./AddPassword";
import PasswordVerification from "./PasswordVerifcation";
import { PrivateRouter } from "./PrivateRouter";
import Profile from "./Profile";
// import Landing from "./../screens/Landing"
import HomePage from "./Homepage";
import AddStudent from "./AddStudent";
import AddTeacher from "./AddTeacher";
import AddRecording from "./AddRecording";
import AddClassWork from "./AddClasswork";
import AddAssignment from "./AddAssignment";
import { PrivateRouterTeacher } from "./PrivateRouterTeacher";
export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/otpverify" element={<OtpVerification />}></Route>
            <Route path="/addpassword" element={<AddPassword />}></Route>
            <Route path="/passwordverify" element={<PasswordVerification />}></Route>
            <Route element={<PrivateRouter />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/assignment" element={<AssignmentsTable />}></Route>
                <Route path="/classwork" element={<ClassWork />}></Route>
                <Route path="/recordedsession" element={<RecordedSession />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/editor" element={<Marie />}></Route>
            </Route>
            <Route path="/addstudent" element={<AddStudent />}></Route>
            <Route path="/addteacher" element={<AddTeacher />}></Route>
            <Route element={<PrivateRouterTeacher />} >
                <Route path="/addrecording" element={<AddRecording />}></Route>
                <Route path="/addassignment" element={<AddAssignment />}></Route>
                <Route path="/addclasswork" element={<AddClassWork />}></Route>
            </Route>

        </Routes >
    );
}