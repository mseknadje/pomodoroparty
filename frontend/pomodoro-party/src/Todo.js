import { Box, Checkbox, Heading,FormControl, FormLabel, Input, Center, VStack, HStack } from "@chakra-ui/react"
import { useState } from "react";
import useEventListener from '@use-it/event-listener'
import { redirect } from "react-router-dom";

export default function Todo(){

    const [todoList, setTodoList] =  useState(["comb hair","eat","drink"]);
    const [inputValue, setInputValue ] = useState();

    const handleOnChange = (event) => {
        setInputValue(event.target.value);
        //console.log(event.target.value)
    }


    const h1Styles = {
            color: "red"

    };
    function handler({ key }) {

        const ENTER_KEYS = ['Enter'];
        if (ENTER_KEYS.includes(String(key))) {
            setTodoList([...todoList, inputValue])
            setInputValue('');
        }
      }
    
    useEventListener('keydown', handler);


    return <Box position="absolute" top="50px" width="313px" height="368px" left="16px" 
    background="#fff" p="15px">
        <Center>
            <Heading as="h1" padding="2px 10px" bgGradient="linear(to-l, #7928CA,#FF0080)"
             bgClip="text" fontWeight="extrabold" mb="15px">
                To-Do List
            </Heading>
        </Center>
        <VStack p={0}> 
                 {
                     
                    todoList.map((t,i)=> {
                        <HStack spacing="24px" w="320px"> 
                        return <FormControl key={i}> <Checkbox mt="5px" pl="0px" mr="10px"/>
                        <FormLabel display={"inline-block"} mt="-5px" ml="0px">{t}</FormLabel>
                        </FormControl>
                        </HStack>
                    })}
        
        
        <Center position="absolute" bottom="10px" left="0" width={"100%"}>
            <Input border="solid 1px black" borderColor={"black"} height="25px"
               mt="15px" placeholder="add an item" width={"275px"}
               borderRadius={"10px"} value={inputValue} onChange={handleOnChange} /> 
        </Center>
        </VStack>
    </Box>
}


