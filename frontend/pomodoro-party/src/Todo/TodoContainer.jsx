import {  VStack,Text } from "@chakra-ui/react"
import './TodoContainer.css';
import {useState} from 'react'
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { addDoc, collection } from "firebase/firestore";
import {db, auth} from "../Login/firebase.js"

function Todo2() {
 
const todosList = [
  { id: 1, text: 'Comb hair'},
  { id: 2, text: 'Scream as loud as you can'},
  { id: 3, text: 'Watch White Lotus'}
];


const [todos, setTodos] = useState(todosList);
// collection reference in database
const todoColRef = collection(db, "ToDos")

//TODO working on adding and removing items to and from DB
function addToDb(){
  addDoc(todoColRef, )
}

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
  const updatedItems = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
  });
  setTodos(updatedItems)
}

  return (
    <VStack p={2}>
    
    <Text bgGradient="linear(to-l, #235377,#235377)"
      bgClip="text"
      fontSize="4xl"
      fontWeight="extrabold">
      Todo List
    </Text>
       
    <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
    <AddTodo addTodo={addTodo}/>

    </VStack>
  );
}

export default Todo2;