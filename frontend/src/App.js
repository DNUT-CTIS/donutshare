import logo from './shared/logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Login} from "./pages/auth/Login";
import {Register} from "./pages/auth/Register";
import {Reason} from "./pages/dashboard/Reason";
import {Home} from "./pages/dashboard/Home";
import {SendPost} from "./pages/chat/SendPost";
import {TempHome} from "./pages/dashboard/TempHome";
import DebaterProfile from './debaterProfile';
import AdminProfile from './adminProfile';
import ModeratorProfile from './moderatorProfile';
import { RegisterMod } from './pages/auth/Register-Mod';



function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/sign-up-mod" element={<RegisterMod/>}></Route>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/sign-up" element={<Register />}></Route>
                  <Route path="/dashboard" element={<TempHome />}></Route>
                  <Route path="/chat" element={<SendPost />}></Route>
                  <Route path="/admin_profile" element={<AdminProfile />}></Route>
                  <Route path="/mod_profile" element={<ModeratorProfile />} />
                  <Route path="/profile" element={<DebaterProfile />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
