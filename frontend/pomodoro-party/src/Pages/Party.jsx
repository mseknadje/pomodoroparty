import Timer from "../Timer";
import Navbar from '../Navbar';
import { useEffect, useState } from "react";
import { Box, Center, Link, HStack, VStack, Button, Input } from "@chakra-ui/react"
import { useControllableProp, useControllableState } from '@chakra-ui/react'
import Todo from '../Todo.js';

export default function Party() {

    const [time, setTime] = useControllableState({ defaultValue: 25})
    const [session, setSession] = useControllableState({ defaultValue: null})

    return (
    <div>
    <Navbar/>
    <Box p='30'>
    <VStack spacing={4}>
           {/* <Link display={"inline-block"} mr="15px" href="/profile" >Create a Session</Link> 
                    <Link display={"inline-block"} href="/profile" background="#fff" border="solid 1px black" p="5px 10px" >Join a Session</Link>    */}
            <Box> 
            <Button colorScheme='facebook' size='md'>Create a Session</Button>
            </Box>
            <HStack>
            <Input placeholder='Enter Session ID' size='md' />
            <Button colorScheme='facebook' size='md'> Join Session </Button> 
            </HStack>
            <HStack>
            <Box>Set timer:</Box>
            <Button colorScheme='pink' size='sm' variant='outline' onClick={() => setTime(15)}>15</Button>
            <Button colorScheme='pink' size='sm' variant='outline' onClick={() => setTime(25)}>25</Button>
            <Button colorScheme='pink' size='sm' variant='outline' onClick={() => setTime(45)}>45</Button>
            <Button colorScheme='pink' size='sm' variant='outline' onClick={() => setTime(60)}>60</Button>
            </HStack> 
    </VStack>
    </Box>
    <Box p='300'>
        <Center>
            <Timer minutes={time} width={"488.95px"} height={"473.22px"} left={"457px"} top={"300px"} background={"#EBE5F5"} /> 
        </Center>
    </Box>
    <Todo/>
    
    </div>);
}