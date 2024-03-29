import './App.css';
import {Dashboard} from "./pages/dashboard/Dashboard";
import {DashboardTest} from "./pages/dashboard/DashboardTest";
import {ErrorPage} from "./pages/dashboard/ErrorPage";
import DebaterProfile from './pages/control-panel/debater-profile/debaterProfile';
import AdminProfile from './pages/control-panel/admin-profile/adminProfile';
import ModeratorProfile from './pages/control-panel/mod-profile/moderatorProfile';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import PrivateRoutes from "./shared/PrivateRoutes";
import {SignupMod} from './pages/auth/SignupMod';
import {DashboardVerified} from "./pages/dashboard/DashboardVerified";
import {DashboardAlreadyVerified} from "./pages/dashboard/DashboardAlreadyVerified";
import Chat from "./pages/chat/Chat";
import {ToastContainer} from "react-toastify";
import React from "react";
import { ForgotPassword } from './pages/auth/forgotpassword';
import { ForgotPasswordEmail } from './pages/auth/forgotPasswordEmail';
import 'react-toastify/dist/ReactToastify.css';
import {Profile} from "./pages/dashboard/Profile"
import TestTopic from "./shared/TestTopic";
import DebaterRoutes from "./shared/DebaterRoutes";
import ModeratorRoutes from "./shared/ModeratorRoutes";
import AdminRoutes from "./shared/AdminRoutes";

function App() {

  const userType = JSON.parse(localStorage.getItem("userType"));

  return (

    <div>
      <ToastContainer autoClose={2000} theme={"dark"}/>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes/>}>
             <Route element={<DebaterRoutes/>}>
               <Route element={<ModeratorRoutes/>}>
                 <Route path="/control-panel/mod-profile" element={<ModeratorProfile/>}/>
               </Route>
               <Route element={<AdminRoutes/>}>
                 <Route path="/control-panel/admin-profile" element={<AdminProfile/>}></Route>
                 <Route path="/control-panel/signup-mod" element={<SignupMod/>}></Route>
               </Route>
               <Route path="/control-panel/profile" element={<DebaterProfile/>}/>
               <Route path="/chat/:roomName" element={<Chat/>} />
             </Route>
          </Route>
          <Route path="/test" element={<TestTopic/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/forgotpassword/:id" element={<ForgotPassword/>}/>
          <Route path="/forgotpasswordemail" element={<ForgotPasswordEmail/>}/>
          <Route path="/dashboard-test" element={<DashboardTest/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard/verified" element={<DashboardVerified/>}/>
          <Route path="/dashboard/already-verified" element={<DashboardAlreadyVerified/>}/>
          <Route path="/" element={<Navigate to="/dashboard"/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
