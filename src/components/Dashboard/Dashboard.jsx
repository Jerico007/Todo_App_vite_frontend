import { useState, useEffect, Suspense, lazy } from "react";

// Redux actions
import { useDispatch, useSelector } from "react-redux";
import { readTodo} from "../../Slice/todoSlice";

// Components
import Navbar from "../Navbar/Navbar";
import TodoForm from "../CreateTodo/TodoForm";
import AddButton from "../Add Button/AddButton";
import LoadButton from "../Load Button/LoadButton";

import "./Dashboard.css";
// import TodoCard from "../TodoCard/TodoCard";
const TodoCard = lazy(() => import("../TodoCard/TodoCard"));

const Dashboard = () => {
  const [addTodo, setTodo] = useState(false);

  const { todosArr, searchArr ,page} = useSelector((state) => state.todos);
  
  // dispatch methode
  const dispatch = useDispatch();

  // useEffect to readTodos on first load
  useEffect(() => {
    dispatch(readTodo(page,[]));
  }, []);



  

  return (
    <div className="Dashboard">
      <h1 className="Dashboard-heading">My TODO{"'"}S</h1>
      <Navbar />

      <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
        <div className="Todo-Lists">
          {searchArr.length > 0 ? (
            searchArr.map((val) => <TodoCard key={val._id} todoData={val} />)
          ) : todosArr.length > 0 ? (
            todosArr.map((val) => <TodoCard key={val._id} todoData={val} />)
          ) : (
            <h1 className="NoData">No todos added</h1>
          )}
        </div>
      </Suspense>

      {addTodo ? <TodoForm setTodo={setTodo} addTodo={addTodo} /> : <></>}
      <AddButton setTodo={setTodo} addTodo={addTodo} />
      <LoadButton/>
    </div>
  );
};

export default Dashboard;
