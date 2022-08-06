import React, { useEffect, useRef, useState } from 'react'
import { TodoInterface } from '../../interface/TodoInterface'
import styles from "./singletodo.module.scss"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import {MdDone} from "react-icons/md"
import { Draggable } from 'react-beautiful-dnd'
// import ReactTooltip from 'react-tooltip';


type SingleTodoProps={
    item:TodoInterface
    todos:TodoInterface[]
    setTodos:React.Dispatch<React.SetStateAction<TodoInterface[]>>
    index:number

}


const SingleTodo:React.FC<SingleTodoProps> = ({item,todos,setTodos,index}:SingleTodoProps) => {


    // This functionality toggles between completed and not completed
    const handleDone=(id:number)=>{
        setTodos(todos.map((todo)=>{
            return todo.id===id?{...todo,isDone:!todo.isDone}:todo
        }))
    }


     // This functionality deletes a todo
    const handleDelete=(id:number)=>{
        setTodos(todos.filter((todo)=>{
           return todo.id !== id
        }))
    }

    // This function edit the todo
    /*create to states
    (1) create a state to keep track of edit mode
    (2) another state to save the newly edited field
    */
   const [edit, setEdit] = useState<boolean>(false)
   const [editTodoValue, setEditTodoValue] = useState<string>(item.todo)
   const handleEdit=(id:number)=>{

    // swicthes the edit mode to true only if the edit mode is false and the task has not been completed

    setTodos(todos.map((todo)=>{
        return todo.id===id?{...todo,todo:editTodoValue}:todo
    }))
    setEdit(false)
    }

    // ensure the input field is on focus when a user tries to edit
    const inputRef=useRef<HTMLInputElement>(null)
    useEffect(() => {
      inputRef.current?.focus()
    }, [edit])

  return (

    <Draggable draggableId={item.id.toString()} index={index}>
        {(provided,snapshot)=>(
               <form key={item.id} className={`${styles.single_todo_form} ${snapshot.isDragging?styles.dragItemCss:""}`} onSubmit={(e)=>{
                e.preventDefault()
                handleEdit(item.id)
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            
            >
        
                {edit?<input value={editTodoValue} onChange={(e)=>{
                    setEditTodoValue(e.target.value)
                }} className={styles.todo_single_edit_input}
                ref={inputRef}
                
                />:
                item.isDone? <s className={styles.single_todo_text}>{item.todo}</s>: <span className={styles.single_todo_text}>{item.todo}</span>
                }
        
              
           
            <div className={styles.iconGroup}>      
            <span className={styles.icon} onClick={()=>{
                  if(!edit && !item.isDone){
                    setEdit(!edit)
                   }
            }}>
            <AiFillEdit/>
            </span>
            <span className={styles.icon}   onClick={()=>{
                handleDelete(item.id)
            }}>
            <AiFillDelete/>
            </span>
            <span className={styles.icon} onClick={()=>{
                handleDone(item.id)
            }} >
            <MdDone/>
          
            </span>
            </div>
          
            </form>
        )}

 
    </Draggable>
    
  )
}

export default SingleTodo