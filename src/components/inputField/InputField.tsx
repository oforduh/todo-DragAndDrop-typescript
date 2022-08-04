import React, { useRef } from 'react'
import styles from "./input.module.scss"


interface InputFiledProps{
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    handleAddTodo:(e: React.FormEvent)=>void
}

const InputField:React.FC<InputFiledProps> = ({todo,setTodo,handleAddTodo}:InputFiledProps) => {

    const inputRef=useRef<HTMLInputElement>(null)
  return (
    <form className={styles.input} onSubmit={(e)=>{
        handleAddTodo(e)
        // blur() removes the focus from in the input
        inputRef.current?.blur()
    }}>
        <input type="input" placeholder='Enter a task' className={styles.input_box} 
        ref={inputRef}
        value={todo}
        onChange={(e)=>{
            setTodo(e.target.value)
        }}
        />
        <button type='submit' className={styles.input_submit}>Go</button>
    </form>
  )
}

export default InputField   