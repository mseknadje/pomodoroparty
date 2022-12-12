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


    return <Box position="absolute" top="100px" width="313px" minHeight="368px" left="16px" 
    background="#fff" p="15px" pb="50px">
        <Center>
            <Heading as="h1" padding="2px 10px" bgGradient="linear(to-l, #1e4460,#15364e)"
             bgClip="text" fontWeight="bold" mb="15px">
                To-Do List
            </Heading>
        </Center>
        <VStack p={"0px"} spacing="0px"> 
                 {
                     
                    todoList.map((t,i)=> {

                         
                        return <FormControl key={i} m="0px"> <Checkbox mt="0px" pl="0px" mr="10px"/>
                        <FormLabel display={"inline-block"} mt="0px" ml="0px" position={"absolute"} top="-5px">
                            {t}</FormLabel>
                        </FormControl>
                       
                    })}
          </VStack>
        
        <Center position="absolute" bottom="10px" left="0" width={"100%"}>
            <Input border="solid 1px black" borderColor={"black"} height="25px"
               mt="15px" placeholder="add an item" width={"275px"}
               borderRadius={"10px"} value={inputValue} onChange={handleOnChange} /> 
        </Center>
      
    </Box>
}


