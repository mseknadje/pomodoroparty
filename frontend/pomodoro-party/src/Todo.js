import { Box, Checkbox, Heading,FormControl, Input } from "@chakra-ui/react"
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
    

    return <Box position="absolute" top="6px" width="313px" height="368px" left="0px" 
    background="#D9D9D9" p="15px">
                 <Heading as="h1" color="white">Todo List</Heading>
                 {
                    todoList.map(t=> {
                        return <FormControl><Checkbox pl="10px"/><label>{t}</label></FormControl>
                    })
                 }
                 <Input value={inputValue} onChange={handleOnChange}   />

    </Box>
}