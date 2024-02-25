/* eslint-disable react/prop-types */
import "./AddButton.css";

const AddButton = ({ setTodo, addTodo }) => {
   
  function handleClick() {
    setTodo(!addTodo);
  }
  return (
    <>
      <button className="Addbutton" onClick={handleClick}>
        +
      </button>
    </>
  );
};

export default AddButton;
