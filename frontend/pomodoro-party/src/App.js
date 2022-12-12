import logo from './logo.svg';
import './App.css';
import './Navbar.css';
import Navbar from './Navbar';
import Party from "./Pages/Party.jsx";
import Todo from './Todo';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Register from "./Login/Register";
import Reset from "./Login/Reset";
import Dashboard from "./Login/Dashboard";
import Login from './Login/Login';
import './Fonts/Comfortaa/static/Comfortaa-Medium.ttf';
import './Fonts/Quicksand/static/Quicksand-Medium.ttf';

function App() {
  return (
    <div className="app">
      {/* <Router> */}
      <Routes>
      <Route exact path="/" element={<Login />} />
        <Route exact path="/party" element={<Party />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* </Router> */}
      </div>
  );
}

export default App;
