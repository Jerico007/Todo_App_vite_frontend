/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import "./TodoForm.css";

// Component
import ColorPicker from "../ColorPicker/ColorPicker";

// Redux library
import { readTodo } from "../../Slice/todoSlice";
import { useDispatch, useSelector } from "react-redux";

// AOS library
import AOS from "aos";
import "aos/dist/aos.css";

// React toastify library
import { toast } from "react-toastify";

// Axios
import axios from "axios";

const TodoForm = ({ addTodo, setTodo }) => {
  const Initial = {
    title: "",
    description: "",
    color: "#ffff",
  };

  // dispatch methode
  const dispatch = useDispatch();

  const { todosArr, page } = useSelector((state) => state.todos);

  // useState for storing todo data
  const [todoData, setTodoData] = useState(Initial);

  // useState for picking colors
  const [showColor, setShow] = useState(false);

  // useState for handling loading state
  const [isLoading, setLoading] = useState(false);

  //   use Effect to initialize AOS
  useEffect(() => {
    AOS.init({
      delay: 100,
    });
  }, []);

  // Function to close the modal
  function handleClose() {
    if (isLoading) {
      toast.warning("Please wait.!");
      return;
    }
    setTodo(!addTodo);
  }

  //  Function to handleForm submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) {
      toast.warning("Please wait.!");
      return;
    }
    if (todoData.title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (todoData.description === "") {
      toast.error("Please enter a description");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://my-todos-0fxd.onrender.com/createtodo`,
        {
          title: todoData.title,
          description: todoData.description,
          color: todoData.color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials:true,
        }
      );
      if (response.data.status === 400) {
        toast.warning(response.data.message);
        setLoading(false);
        return;
      } else {
        setTodoData(Initial);
        toast.success(response.data.message);
        setLoading(false);
        setTodoData(Initial);
        // To close todo form
        setTodo(!addTodo);
        dispatch(readTodo(page, [...todosArr]));
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  // Function to handle color picker
  function pickColor(e) {
    if (isLoading) {
      toast.warning("Please wait.!");
      return;
    }
    setTodoData({ ...todoData, color: e.target.id });
  }

  return (
    <div className="TodoForm-Holder" onClick={handleClose}>
      <form
        data-aos="zoom-in"
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ backgroundColor: todoData.color ? todoData.color : "" }}
      >
        <input
          type="text"
          placeholder="Enter title here.."
          value={todoData.title}
          onInput={(e) => {
            setTodoData({ ...todoData, title: e.target.value });
          }}
        ></input>
        <textarea
          placeholder="Enter content..."
          value={todoData.description}
          onInput={(e) => {
            setTodoData({ ...todoData, description: e.target.value });
          }}
        ></textarea>

        <div
          className="colorButton"
          onClick={() => {
            setShow(!showColor);
          }}
        >
          {!showColor ? (
            <FontAwesomeIcon
              icon={faPalette}
              color="gray"
              size="lg"
              cursor={"pointer"}
            />
          ) : (
            <FontAwesomeIcon
              icon={faXmark}
              color="gray"
              size="lg"
              cursor={"pointer"}
            />
          )}
        </div>
        {showColor ? (
          <ColorPicker
            className={"color-picker"}
            dataAos={"fade-down"}
            callback={pickColor}
          />
        ) : (
          <></>
        )}
        <button type="submit">{!isLoading ? "Create" : "Loading"}</button>
      </form>
    </div>
  );
};

export default TodoForm;
