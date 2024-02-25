import React from 'react'

import "./LoadButton.css";

// Redux library
import { useSelector,useDispatch } from 'react-redux';
import {readTodo} from "../../Slice/todoSlice"

function LoadButton() {
  
// Todo states
  const {page,todosArr} = useSelector(state => state.todos);

  // dispatcher
  const dispatch = useDispatch();
  
   

  return (
    <button className="Loadbutton" onClick={()=>{
    
      dispatch(readTodo(page,[...todosArr]));
    }} >
    Load More
  </button>
  )
}

export default LoadButton