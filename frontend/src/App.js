import logo from './shared/logo.svg';
import './App.css';
import {Login} from "./pages/auth/Login";
import {Register} from "./pages/auth/Register";
import {Reason} from "./pages/dashboard/Reason";
import {Home} from "./pages/dashboard/Home";
import {SendPost} from "./pages/chat/SendPost";
import {TempHome} from "./pages/dashboard/TempHome";
import {Dashboard} from "./Dashboard";
import DebaterProfile from './debaterProfile';
import AdminProfile from './adminProfile';
import ModeratorProfile from './moderatorProfile';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./shared/PrivateRoutes";
import {Auth} from "./pages/auth/Auth";
import { RegisterMod } from './pages/auth/Register-Mod';
import MaterialLogin from "./pages/auth/MaterialLogin";
import {DashboardVerified} from "./pages/dashboard/DashboardVerified";
import {DashboardAlreadyVerified} from "./pages/dashboard/DashboardAlreadyVerified";



function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
              <Route element={<PrivateRoutes />}>
              <Route path="/dashboard2" element={<TempHome/>}></Route>
              <Route path="/chat" element={<SendPost/>}></Route>
              <Route path="/admin-profile" element={<AdminProfile />}></Route>
              <Route path="/mod-profile" element={<ModeratorProfile />} />
              <Route path="/sign-up-mod" element={<RegisterMod/>}></Route>
              <Route path="/profile" element={<DebaterProfile />} />
              <Route path="/chat" element={<SendPost/>}></Route>
              </Route>
              <Route path="/dashboard" element={<Dashboard/>}>
              </Route>
              <Route path="/dashboard/verified" element={<DashboardVerified/>}/>
              <Route path="/dashboard/already-verified" element={<DashboardAlreadyVerified/>}/>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/auth" element={<Auth />}></Route>
              <Route path="/mat" element={<MaterialLogin />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-up" element={<Register/>}></Route>
              
           

          </Routes>


          </BrowserRouter>
      </div>
  );
}

export default App;
