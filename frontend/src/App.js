import logo from './shared/logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from "./auth/Login";
import {Register} from "./auth/Register";
import {Reason} from "./dashboard/Reason";
import {Home} from "./dashboard/Home";



function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-up" element={<Register/>}></Route>
              <Route path="/dashboard" element={<Home/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
