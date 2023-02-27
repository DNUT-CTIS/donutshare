import logo from './logo.svg';
import './App.css';
import DebaterProfile from './debaterProfile';
import AdminProfile from './adminProfile';
import ModeratorProfile from './moderatorProfile';
import { BrowserRouter, Routes, Route } from "react-router-dom";





function App() {
  return (
      <div>
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
  );
}

export default App;
