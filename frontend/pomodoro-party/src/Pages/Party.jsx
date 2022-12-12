import Timer from "../Timer";
import Navbar from '../Navbar';
import { useEffect, useState } from "react";
import { Box, Center, Link } from "@chakra-ui/react"
import Todo from '../Todo.js';

export default function Party() {

    return (<div>
       
         <Navbar/>
         <Center>
    <Box>
    {/* <Link display={"inline-block"} mr="15px" href="/profile" >Create a Session</Link> 
        <Link display={"inline-block"} href="/profile" background="#fff" border="solid 1px black" p="5px 10px" >Join a Session</Link>    */}
        <button className="create_session"> Create a Session </button> 
        <input type= "text" placeholder="Enter Session ID Here"> </input>
        
    </Box>
   </Center>
    <Todo/>
    
    <Timer minutes={25} width={"488.95px"} height={"473.22px"} left={"457px"} top={"379px"} background={"#EBE5F5"} /> 

    </div>)
}