
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './component/home/Home';
import Navbar from './component/navbar/Navbar.js';
import UpdateUser from './component/home/UpdateUser.js';
import CreateUser from './component/home/CreateUser/CreateUser.js';
import CreateTeam from './component/team/CreateTeam/CreateTeam.js';
import TeamProfile from './component/team/TeamProfile/TeamProfile.js';
import Profile from './component/team/profile/Profile.js';
function App() {
  return (
    <>

    <Router>
    <Navbar/>
       <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/update" element={<UpdateUser/>} />
       <Route path="/create/team" element={<CreateTeam/>} />
       <Route path="/create" element={<CreateUser/>} />
       <Route path="/team" element={<TeamProfile/>} />
       <Route path="/profile" element={<Profile/>} />
       
       </Routes>
     </Router>
    </>
  );
}

export default App;
