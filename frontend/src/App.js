import './App.css';
import {Dashboard} from "./pages/dashboard/Dashboard";
import DebaterProfile from './pages/control-panel/debater-profile/debaterProfile';
import AdminProfile from './pages/control-panel/admin-profile/adminProfile';
import ModeratorProfile from './pages/control-panel/mod-profile/moderatorProfile';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import PrivateRoutes from "./shared/PrivateRoutes";
import {SignupMod} from './pages/auth/SignupMod';
import {DashboardVerified} from "./pages/dashboard/DashboardVerified";
import {DashboardAlreadyVerified} from "./pages/dashboard/DashboardAlreadyVerified";
<<<<<<< HEAD
import {Chat} from "./pages/chat/Chat";

=======
import Chat from "./pages/chat/Chat";
>>>>>>> aleren-v2

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/control-panel/admin-profile" element={<AdminProfile/>}></Route>
            <Route path="/control-panel/mod-profile" element={<ModeratorProfile/>}/>
            <Route path="/control-panel/signup-mod" element={<SignupMod/>}></Route>
            <Route path="/control-panel/profile" element={<DebaterProfile/>}/>
<<<<<<< HEAD
            <Route path="/chat" element={<Chat/>}></Route>
=======
              <Route path="/chat/:roomName" element={<Chat/>} />
>>>>>>> aleren-v2
          </Route>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/verified" element={<DashboardVerified/>}/>
          <Route path="/dashboard/already-verified" element={<DashboardAlreadyVerified/>}/>
          <Route path="/" element={<Navigate to="/dashboard"/>}/>
        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
