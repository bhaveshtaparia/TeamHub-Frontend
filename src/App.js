
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './component/home/Home';
import Navbar from './component/navbar/Navbar.js';
import UpdateUser from './component/home/UpdateUser.js';
import CreateUser from './component/home/CreateUser/CreateUser.js';
function App() {
  return (
    <>

    <Router>
    <Navbar/>
       <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/update" element={<UpdateUser/>} />
       <Route path="/create" element={<CreateUser/>} />
       
       </Routes>
     </Router>
    </>
  );
}

export default App;
