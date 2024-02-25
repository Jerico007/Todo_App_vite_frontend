/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// Components
import ColorPicker from "../ColorPicker/ColorPicker";
import ConfirmDelete from "../Confirm Delete/ConfirmDelete";

// AOS library
import AOS from "aos";
import "aos/dist/aos.css";

// React Toastify
import { toast } from "react-toastify";

import "./TodoCard.css";
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faTrash,
  faXmark,
  faFloppyDisk,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
//Redux library
import { useDispatch,useSelector } from "react-redux";
import { updateTodo } from "../../Slice/todoSlice";

const TodoCard = ({ todoData }) => {
  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
    });
  }, []);

  // dispatch
  const dispatch = useDispatch();

 

  // useState to handle edit/delete state
  const [edit, setEdit] = useState({
    textEdit: false,
    colorEdit: false,
  });

  // useState to handle delete state
  const [deleteId, setDeleteId] = useState(false);

  // Function to handle delete
  function handleDelete(e){
    if(edit.colorEdit !== false || edit.textEdit !== false)
    {
      return;
    }
    if(deleteId !== false)
    {
      setDeleteId(false);
    }
    else{
      setDeleteId(e.target.className);
    }
  }

  // function to edit text data
  function handleTextEdit() {
    // Condition to only allow text editing
    if (edit.colorEdit !== false || deleteId !== false) {
      return;
    }
    if (edit.textEdit !== false) {
      handleSaveChanges();
    } else {
      setEdit({ ...edit, textEdit: true });
    }
  }

  // function to edit color data
  function handleColorEdit() {
    // Condition to only allow color editing
    if (edit.textEdit !== false  || deleteId !== false) {
      return;
    }
    if (edit.colorEdit !== false) {
      handleSaveChanges();
    } else {
      setEdit({ ...edit, colorEdit: true });
    }
  }

  // Function to save changes
  function handleSaveChanges() {
    if (formData.title === "") {
      toast.error("Title is required");
      return;
    }
    if (formData.description === "") {
      toast.error("Description is required");
      return;
    }

    if (
      formData.title === todoData.todo.title &&
      formData.description === todoData.todo.description &&
      formData.color === todoData.todo.color
    ) {
      setEdit({ textEdit: false, colorEdit: false });
      return;
    }
    dispatch(updateTodo(formData, todoData._id));
    setEdit({ textEdit: false, colorEdit: false });
  }

  // intial state of the formData
  const initialState = {
    title: todoData.todo.title,
    description: todoData.todo.description,
    color: todoData.todo.color,
    createdAt: todoData.todo.createdAt,
  };

  // useState for form Input
  const [formData, setFormData] = useState(initialState);

  // Function to handle title Input
  function handleTitleChange(e) {
    setFormData({ ...formData, title: e.target.value });
  }

  // Function to handle description Input
  function handleDescriptionChange(e) {
    setFormData({ ...formData, description: e.target.value });
  }

  // Function to handle color Input
  function handleColorChange(e) {
    e.stopPropagation();
    setFormData({ ...formData, color: e.target.id });
  }

  return (
    <div
      className="TodoCard"
      data-aos="zoom-in"
      style={{ backgroundColor: formData.color }}
    >
      {edit.textEdit === true ? (
        <input
         data-aos="fade"
          type="text"
          placeholder="Enter title here.."
          value={formData.title}
          onInput={handleTitleChange}
          style={{ backgroundColor: formData.color }}
        ></input>
      ) : (
        <h4 className="Heading">{formData.title}</h4>
      )}
      {edit.textEdit === true ? (
        <textarea
        data-aos="fade"
          placeholder="Enter content..."
          value={formData.description}
          onInput={handleDescriptionChange}
          style={{ backgroundColor: formData.color }}
        ></textarea>
      ) : (
        <pre className="Content">{formData.description}</pre>
      )}

      <div className="Buttons">
        <div onClick={handleTextEdit} className={todoData._id}>
          <FontAwesomeIcon
            icon={edit.textEdit === false ? faPenToSquare : faFloppyDisk}
            color="#747272"
            size="lg"
            cursor={"pointer"}
            style={{ zIndex: "-1" }}
          />
        </div>
        <div onClick={handleDelete} className={todoData._id}>
          <FontAwesomeIcon
            icon={deleteId === false ? faTrash : faXmark}
            color="#747272"
            size="lg"
            cursor={"pointer"}
            style={{ zIndex: "-1" }}
          />
         
        </div>
        <div onClick={handleColorEdit} className={todoData._id}>
          <FontAwesomeIcon
            icon={edit.colorEdit === false ? faPalette : faXmark}
            color="#747272"
            size="lg"
            cursor={"pointer"}
            style={{ zIndex: "-1" }}
          />
          {edit.colorEdit === true ? (
            <ColorPicker
              className={"todo-color-picker"}
              callback={handleColorChange}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {
               deleteId ? <ConfirmDelete deleteId={deleteId} setDeleteId={setDeleteId}/> : <></>
           }
    </div>
  );
};

export default TodoCard;
