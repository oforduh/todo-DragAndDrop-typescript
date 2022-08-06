import React from 'react'
import styles from "./todolist.module.scss"
import { TodoInterface } from '../../interface/TodoInterface'
import SingleTodo from '../singleTodo/SingleTodo'
import { Droppable } from 'react-beautiful-dnd'

interface TodoListProps{
    todos:TodoInterface[]
    setTodos:React.Dispatch<React.SetStateAction<TodoInterface[]>>
    completedTodo:TodoInterface[]
    setCompletedTodo:React.Dispatch<React.SetStateAction<TodoInterface[]>>
}

const TodoList:React.FC<TodoListProps> = ({todos,setTodos,completedTodo,setCompletedTodo}:TodoListProps) => {

  return (
 <div className={styles.todoContainer}>
  <Droppable droppableId="TodoList">
    {(provided,snapshot)=>(
      <div className={`${styles.activeClassContainer} ${snapshot.isDraggingOver?styles.dragActiveCss:""}`} ref={provided.innerRef} {...provided.droppableProps}>
         <span className={styles.todos_heading}>
        Active Tasks
        </span>
       {todos.map((item,index)=>(
       <SingleTodo item={item}
       setTodos={setTodos}
       todos={todos}
       index={index}
       key={item.id}
      />
    ))}
    {provided.placeholder}
    </div>

   )}


  </Droppable>
  <Droppable droppableId="TodoRemove">
    {(provided,snapshot)=>(
      <div className={`${styles.completedClassContainer} ${styles.remove}  ${snapshot.isDraggingOver?styles.dragCompleteCss:""}`}  ref={provided.innerRef} {...provided.droppableProps}>
      <span className={styles.todos_heading}>
      completed Tasks
      </span>
      {completedTodo.map((item,index)=>(
      <SingleTodo item={item}
      setTodos={setCompletedTodo}
      todos={completedTodo}
      index={index}
      key={item.id}
      />
      ))}
        {provided.placeholder}
    </div>
    )}

  </Droppable>
    </div>
  )
}

export default TodoList 