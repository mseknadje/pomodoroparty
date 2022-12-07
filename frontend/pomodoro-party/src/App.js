import logo from './logo.svg';
import './App.css';

import './Navbar.css';
import Navbar from './Navbar';
import { Party } from './Pages/Party';
import { Profile } from './Pages/Profile';
import Todo from './Todo';
import { Route, Routes} from "react-router-dom";
import { Box } from "@chakra-ui/react"
import Main from "./Main"

function App() {
  return (
    <Box className="container" bgColor={"#FFF3F3"}>
      <Routes>
         <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/party" element={<Party />} />
      </Routes>
      </Box>

  );
}

export default App;
