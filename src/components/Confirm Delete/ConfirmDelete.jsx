/* eslint-disable react/prop-types */

import { deleteTodo,setTodos ,setPage} from "../../Slice/todoSlice";
import { useDispatch,useSelector } from "react-redux";
const ConfirmDelete = ({ setDeleteId, deleteId }) => {
  // dispatch
  const dispatch = useDispatch();

  const {todosArr} = useSelector(state => state.todos);

  function handleYes() {
    // filtering out new array elements
    const newTodos = todosArr.filter((val)=>val._id !== deleteId);
    // updating todos UI
    dispatch(setTodos(newTodos));
    // Updating page/skip count
    dispatch(setPage(newTodos.length));
    dispatch(deleteTodo(deleteId));
  }

  function handleNo() {
    setDeleteId(false);
  }
  return (
    <div className="ConfirmDelete" data-aos="fade">
      <p>Confirm Delete.</p>
      <div className="Confirm-buttons">
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
