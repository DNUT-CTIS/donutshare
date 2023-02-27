import logo from './shared/logo.svg';
import './App.css';
import {Login} from "./pages/auth/Login";
import {Register} from "./pages/auth/Register";
import {Reason} from "./pages/dashboard/Reason";
import {Home} from "./pages/dashboard/Home";
import {SendPost} from "./pages/chat/SendPost";
import {TempHome} from "./pages/dashboard/TempHome";
import DebaterProfile from './debaterProfile';
import AdminProfile from './adminProfile';
import ModeratorProfile from './moderatorProfile';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-up" element={<Register/>}></Route>
              <Route path="/dashboard" element={<TempHome/>}></Route>
              <Route path="/chat" element={<SendPost/>}></Route>
          </Routes>

        </BrowserRouter>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<AdminProfile />}>
                  </Route>
                  <Route path="/admin_profile" element={<AdminProfile />}></Route>
                  <Route path="/mod_profile" element={<ModeratorProfile />} />
                  <Route path="/profile" element={<DebaterProfile />} />
              </Routes>
          </BrowserRouter>
      </div>
>>>>>>> main
  );
}

export default App;
