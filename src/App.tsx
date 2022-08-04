import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styles from "./app.module.scss"
import InputField from './components/inputField/InputField'
import TodoList from './components/todoList/TodoList'
import { TodoInterface } from './interface/TodoInterface'


const App:React.FC = () => {
  const [todo,setTodo]=useState<string>("")
  const [todos,setTodos]=useState<TodoInterface[]>([])
  const [todoWatch,setTodoWatch]=useState<boolean>(false)
  const [completedTodo,setCompletedTodo]=useState<TodoInterface[]>([])


//get the array from local storage
useEffect(() => { 
  const json = localStorage.getItem("todos");
  if (!json) return
  console.log(json);
  const jsonTodoList = JSON.parse(json);
  console.log(jsonTodoList);
  setTodos(jsonTodoList);
  setTodoWatch(false)
}, [todoWatch]);


// This functionality will run anytime there are changes in the TodoList state and it saves the array to local storage
useEffect(() => {
  const jsonTodoList = JSON.stringify(todos);
  if (todos.length < 1) return
  localStorage.setItem("todos", jsonTodoList);
  setTodoWatch(true)
  
}, [todos]);


    // a function that adds new todo
    const handleAddTodo=(e: React.FormEvent)=>{
      e.preventDefault()
      if(todo){
        setTodos([...todos,{  id:Date.now(),
          todo:todo,
          isDone:false}])
          setTodo("")
      }
      }
  return (

    <DragDropContext onDragEnd={()=>{}}>


    <div className={styles.appContainer}>
      <span className={styles.heading}>
        TYPESCRIPT REACT TASKIFY
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo}/>
      <TodoList todos={todos} setTodos={setTodos} completedTodo={completedTodo} setCompletedTodo={setCompletedTodo}/>
   
    </div>
    </DragDropContext>
  )
}

export default App