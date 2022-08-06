import React, { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
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
  const jsonTodoList = JSON.parse(json);
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



      const onDragEnd=(result:DropResult)=>{
        console.log(result);
        const {source,destination}=result

        // check if the destination is not a droppable destination
        if(destination===null) return
        
        // check if the destination is the same as the source and the destination index is same as the source index
        if(destination?.droppableId===source?.droppableId && destination.index===source.index) return


        // the logic of the drag and drop
        // set active to the todo array and completed to the completed array
        let add;
        let active = todos;
        let complete= completedTodo;

        // get the item we are dragging from the source and set it to the add variable 
        // use splice to remove it from the array
        if(source.droppableId === "TodoList"){
          add =active[source.index];
          active.splice(source.index,1)
        }else{
          add =complete[source.index];
          complete.splice(source.index,1)
        }


          // get the item we are dropping to the destination and set it to the add variable 
        // use splice to add it to the array
        if(destination?.droppableId === "TodoList"){
          active.splice(destination?.index,0,add)
        }else{
          if(complete.length < 0) return
          if(destination === undefined) return
          complete.splice(destination.index,0,add)
        }

        setCompletedTodo(complete)
        setTodos(active)

      }
  return (

    <DragDropContext onDragEnd={onDragEnd}>


    <div className={styles.appContainer}>
      <span className={styles.heading}>
        TYPESCRIPT DRAG AND DROP TASKIFY
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo}/>
      <TodoList todos={todos} setTodos={setTodos} completedTodo={completedTodo} setCompletedTodo={setCompletedTodo}/>
   
    </div>
    </DragDropContext>
  )
}

export default App