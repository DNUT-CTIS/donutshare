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



function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
              <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<TempHome/>}></Route>
              <Route path="/chat" element={<SendPost/>}></Route>
              <Route path="/admin-profile" element={<AdminProfile />}></Route>
              <Route path="/mod-profile" element={<ModeratorProfile />} />
              <Route path="/profile" element={<DebaterProfile />} />
              </Route>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/auth" element={<Auth />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-up" element={<Register/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route path="/chat" element={<SendPost/>}></Route>

          </Routes>


          </BrowserRouter>
      </div>
  );
}

export default App;
