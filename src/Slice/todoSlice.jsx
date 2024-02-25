import { createSlice } from "@reduxjs/toolkit";

// React toastify
import { toast } from "react-toastify";

// Axios
import axios from "axios";

const initialState = {
  todosArr: [],
  searchArr: [],
  page: 0,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todosArr = action.payload;
    },
    setSearch: (state, action) => {
      state.searchArr = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

// Todo actions
export const { setTodos, setSearch, setAuth, setPage } = todoSlice.actions;

// Read todo middleware
export const readTodo = (page, prevTodos) => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/readtodo/${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      );

      const arr = response.data.data;
      if (arr) {
        if (arr && arr.length > 0 && prevTodos.length > 0) {
          arr.reverse();
          dispatch(setTodos([...arr, ...prevTodos]));
          // Updating page value when adding new todo
          dispatch(setPage(prevTodos.length + arr.length));
        } else if (arr && arr.length > 0) {
          arr.reverse();
          dispatch(setTodos([...arr]));

          dispatch(setPage(arr.length));
        } else {
          toast.warn(arr.message);
        }
      } else {
        toast.warn(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
};

// Update todo middleware
export const updateTodo = (updatedData, todoId) => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:5000/updatetodo`,
        { updatedData: updatedData, todoId: todoId },
        {
          headers:{
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        },
       
      );
      toast.success(response.data.message);
      // dispatch(readTodo(""));
    } catch (err) {
      toast.error(err.message);
    }
  };
};

// Delete todo middleware
export const deleteTodo = (todoId) => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:5000/deletetodo`,
       
        {
          todoId: todoId,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
          ,
          withCredentials: true
        }
      );

      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
};

export default todoSlice.reducer;
