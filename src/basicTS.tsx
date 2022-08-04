import React from 'react';
import './App.css';

// Declaring data types
let name:string;
let age:number;
let isStudent:boolean;
let hubbies: string[];
// tuples
let roles:[number,string]

// unknown is recommended instead of any
let personName:unknown

type Person={
  name:string,
  age?:number
}

let person : Person ={
  name:"Harrison",
  // age:50
}

let lotsOfPeople:Person[]

// void returns undefined, never returns nothinh
let printName:(name:string)=>never


// Extending types
type X={
  a:string,
  b:number
}

type Y= X & {
  c:string,
  d:number
}
let y:Y={
  a:"Harrison",
  b:31,
  c:"Ebube",
  d:30
}

// Extending interface
interface PersonObject {
  name:string,
  age?:number
}

interface Guy extends PersonObject{
  profession:string
}



function App() {
  return (
    <div>
  Hello Worl    </div>
  );
}

export default App;
