import { Box, Center, Link } from "@chakra-ui/react"
import Timer from './Timer.jsx';
import Todo from './Todo.js';
import Navbar from './Navbar';
import Login from './Login';

export default function Main(){


    return  <div className="App">
   <Navbar/>
         <h1>Login</h1>
         <Login/>
    </div>



}

