import logo from './shared/logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from "./pages/auth/Login";
import {Register} from "./pages/auth/Register";
import {Reason} from "./pages/dashboard/Reason";
import {Home} from "./pages/dashboard/Home";
import {SendPost} from "./pages/chat/SendPost";
import {TempHome} from "./pages/dashboard/TempHome";



function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-up" element={<Register/>}></Route>
              <Route path="/dashboard" element={<TempHome/>}></Route>
              <Route path="/chat" element={<SendPost/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
