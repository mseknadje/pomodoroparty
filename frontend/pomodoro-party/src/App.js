import logo from './logo.svg';
import './App.css';
import './Navbar.css';
import Navbar from './Navbar';
import { Party } from './Pages/Party';
import { Profile } from './Pages/Profile';
import Todo from './Todo';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Register from "./Login/Register";
import Reset from "./Login/Reset";
import Dashboard from "./Login/Dashboard";
import Login from './Login/Login';

/**
 * The top-level function that contains routes to each page 
 * @returns 
 */
// function App() {
//   return (
//     <Box className="container" bgColor={"#FFF3F3"}>
//       <Routes>
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/party" element={<Party />} />
//       </Routes>
//     </Box>
//   );
// }

function App() {
  return (
    <div className="app">
      {/* <Router> */}
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/party" element={<Party />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* </Router> */}
      </div>
  );
}

export default App;
