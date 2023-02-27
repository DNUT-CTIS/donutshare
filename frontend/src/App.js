import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Dashboard} from './Dashboard'

function App() {
  return (
    <div>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />}>
            </Route>
        </Routes>
    </BrowserRouter>
</div>
  );
}

export default App;
