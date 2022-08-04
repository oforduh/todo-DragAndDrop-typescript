import React from 'react'
import styles from "./todolist.module.scss"
import { TodoInterface } from '../../interface/TodoInterface'
import SingleTodo from '../singleTodo/SingleTodo'

interface TodoListProps{
    todos:TodoInterface[]
    setTodos:React.Dispatch<React.SetStateAction<TodoInterface[]>>
}

const TodoList:React.FC<TodoListProps> = ({todos,setTodos}:TodoListProps) => {

  return (
    <div className={styles.todoContainer}>
 <div className={styles.activeClassContainer}>
<span className={styles.todos_heading}
>
  Active Tasks
</span>


 </div>
 <div className={`${styles.completedClassContainer} ${styles.remove}`}></div>
    </div>
  )
}

export default TodoList 