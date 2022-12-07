import { Box, Checkbox, Heading,FormControl, FormLabel, Input, Center } from "@chakra-ui/react"
import { useState } from "react";
import useEventListener from '@use-it/event-listener'
import { redirect } from "react-router-dom";

export default function Todo(){

    const [todoList, setTodoList] =  useState(  ["comb hair","eat","drink"] );
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


    return <Box position="absolute" top="36px" width="313px" height="368px" left="0px" 
    background="#fff" p="15px">
        <Center>
                 <Heading as="h1" color="black" border="solid 1px black"
                 padding="2px 10px" fontWeight={"normal"} mb="15px">To-Do List</Heading>
                 </Center>
                 {
                    todoList.map((t,i)=> {
                        return <FormControl key={i}><Checkbox mt="5px" pl="10px" mr="10px"/>
                        <FormLabel display={"inline-block"} mt="-5px">{t}</FormLabel>
                        </FormControl>
                    })
                 }
                 <Center position="absolute" bottom="10px" left="0"
                 
                 width={"100%"}>
                 <Input border="solid 1px black"
                 borderColor={"black"}
                 height="23px"
                 mt="15px"
                 placeholder="add an item"
                 width={"200px"}
                  borderRadius={"10px"} value={inputValue} onChange={handleOnChange}   />
</Center>

    </Box>
}


