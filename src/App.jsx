import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Splash from './Splash.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import ResidentPage from './Residentpage.jsx';
import Userdashboard from './Userdashboard.jsx';
import Adminprofile from './Adminprofiles.jsx';
import Residentprofile from "./Residentprofile.jsx";


function App() {
 return(
    <Router>
      <Routes>
         <Route path="/" element={<Splash />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/residentpage" element={<ResidentPage />} />
         <Route path="/userdashboard" element={<Userdashboard />} />
         <Route path="/adminprofile" element={<Adminprofile />} />
         <Route path="/residentprofile" element={<Residentprofile />} />
      </Routes>
    </Router>
 );
}

export default App
