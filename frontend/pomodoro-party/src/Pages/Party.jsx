import Timer from "../Timer";
import Navbar from '../Navbar';
import { useEffect, useState } from "react";
import { Box, Center, Link } from "@chakra-ui/react"
import Todo from '../Todo.js';

function Party() {
    return (
    <div> 
    <Navbar/>
    <Center>
        <Box>
        <Link display={"inline-block"} mr="15px" href="/profile" >Session ID</Link> 
        <Link display={"inline-block"} href="/profile" background="#fff" border="solid 1px black" p="5px 10px" >Invite a Friend</Link>   
        </Box>
   </Center>
    <Todo/>
    
    <Timer minutes={5} width={"210px"} height={"209px"} left={"792px"} top={"165px"} background={"#E5EDFE"} />  
    <Timer minutes={25} width={"488.95px"} height={"473.22px"} left={"457px"} top={"379px"} background={"#EBE5F5"} /> 
    <Timer minutes={45} width={"347.98px"} height={"347.98px"} left={"1055px"} top={"200.02px"} background={"#E5F5F1"}/> 
    <Timer minutes={60} width={"259.84px"} height={"251.5px"} left={"981px"} top={"591px"} background={"#FFF1DE"}/> 
    </div>
    );
}

export default Party; 