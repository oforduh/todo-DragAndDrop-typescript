import { useReducer } from "react";

export interface TodoInterface{
    id:number;
    todo:string;
    isDone:boolean
}


// using reducer with typescript
 
//  const ReducerExample = () => {

//     type Actions=
//     | {type:"add";payload:string}
//     | {type:"remove";payload:number}
//     | {type:"done";payload:number}

// const TodoReducer=(state:Todo[],action:Actions)=>{
// switch (action.type) {
//     case "add":
//         return[
//             ...state,{  id:Date.now(),
//                 todo:action.payload,
//                 isDone:false}
//         ]

//         case "remove":
//         return state.filter((todo)=>{
//             return todo.id !== action.payload
//          })

//          case "done":
//             return state.map((todo)=>{
//                 return todo.id===action.payload?{...todo,isDone:!todo.isDone}:todo
//              })
       

//     default:
//         return state
// }
// }

//     const [state, dispatch] = useReducer(TodoReducer, [])
//    return (
//      <div>ReducerExample</div>
//    )
//  }
 
//  export default ReducerExample