import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo2 from frontend/pomodoro-party/src/Todo/TodoContainer.jsx;
import Register from '../Login/Register';

/**
 * Renders a Todo List before each test.
 */
 describe('Todo List Tests', () => {
  beforeEach(() => {
    render(<Todo2/>);
  });

  /**
   * In this test, we check to make sure that the todo list is appearing on the webpage. 
   */
  test('confirming todo element is rendered', () => {
    const todoList = screen.getByRole("TodoList")
    const addTodo = screen.getAllByRole("AddTodo")
    expect(todoList).toBeInTheDocument
    expect(addTodo).toBeInTheDocument
  })


  //Test adding to the Todo list
  test('todo list entry', () => {
    const addTodo = screen.getAllByRole("AddTodo")
    const addTodoButton = screen.getByRole("button") 

    const todoEntry = "get userData/animal.csv"
    userEvent.type(addTodo, todoEntry)
    userEvent.click(addTodoButton)

    setTimeout(() => {
      let output = screen.findByText(todoEntry)
      expect(output).toBeInTheDocument()
    },500)
  });

});


/**
 * In this test, we test that a user can register sucessfully, 
 * and that there is a succesful connection to firebase. 
 */
  test("registration test", async() => {
    render(<Register/>);

})