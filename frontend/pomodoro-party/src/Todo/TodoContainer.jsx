import {  VStack,Text } from "@chakra-ui/react"
import './TodoContainer.css';
import {useState} from 'react'
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

function Todo2() {
 
const todosList = [
  { id: 1, text: 'Comb hair'},
  { id: 2, text: 'Scream as loud as you can'},
  { id:3, text: 'Watch White Lotus'}
];

const [todos, setTodos] = useState(todosList);


function deleteTodo(id){
const newTodos = todos.filter((item)=> {
  return item.id !== id 
})
setTodos(newTodos)
console.log(newTodos)
}

function addTodo(newTodo){
setTodos([...todos,newTodo])
}

function editTodo(id,updatedTodo){
const updatedItem = todos.map((todo) => {
    return todo.id === id ? updatedTodo : todo;
  });
setTodos(updatedItem)
}



  return (
    <VStack p={5}>
    
    <Text bgGradient="linear(to-l, #7928CA,#FF0080)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="extrabold">
      Todo List
    </Text>
       
    <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
    <AddTodo addTodo={addTodo}/>


    </VStack>
  );
}

export default Todo2;