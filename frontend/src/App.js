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

function App() {
  return (

    <div>
      <ToastContainer autoClose={2000} theme={"dark"}/>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/control-panel/admin-profile" element={<AdminProfile/>}></Route>
            <Route path="/control-panel/mod-profile" element={<ModeratorProfile/>}/>
            <Route path="/control-panel/signup-mod" element={<SignupMod/>}></Route>
            <Route path="/control-panel/profile" element={<DebaterProfile/>}/>
            <Route path="/chat/:roomName" element={<Chat/>} />
          </Route>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/forgotpasswordemail" element={<ForgotPasswordEmail/>}/>
          <Route path="/dashboard-test" element={<DashboardTest/>}/>
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
