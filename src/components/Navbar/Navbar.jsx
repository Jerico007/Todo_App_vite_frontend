// Navbar css
import "./Navbar.css";

// Axios
// import axios from "axios";
// Toastify library
import { toast } from "react-toastify";

// Redux library
import { setTodos, setSearch } from "../../Slice/todoSlice";
import { useDispatch, useSelector } from "react-redux";

// import Cookie from "js-cookie";

const Navbar = () => {
  const dispatch = useDispatch();

  const { todosArr } = useSelector((state) => state.todos);
  // Handle logout
  async function handleLogout() {
    try {
      // const response = await axios.get(`http://localhost:5000/logout`);
      // Cookie.remove("userId");
      localStorage.removeItem('token');
      dispatch(setTodos([]));
      // toast.success(response.data.message);
      toast.success("Logged out successfully!");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  }
  
  // Handle logout All devices
  async function handleLogoutAll() {
    try {
      // const response = await axios.get(`http://localhost:5000/logoutall`);
      // Cookie.remove("userId");
      localStorage.removeItem('token');
      dispatch(setTodos([]));
      // toast.success(response.data.message);
      toast.success("Logged out successfully!");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  }

  //  function to handle search
  function handleSearch(e) {
    if (e.target.value !== "" && todosArr.length > 0) {
      const searchArr = todosArr.filter(
        (val) =>
          val.todo.title.substring(0, e.target.value.length).toLowerCase() ===
          e.target.value.toLowerCase()
      );
      dispatch(setSearch(searchArr));
    } else {
      dispatch(setSearch([]));
    }
  }

  return (
    <div className="Navbar">
      <input
        type="text"
        onInput={handleSearch}
        placeholder="Search by title"
      ></input>
      <button className="Logout" onClick={handleLogout}>
        Logout
      </button>
      <button className="Logout-all" onClick={handleLogoutAll}>
        Logout All
      </button>
    </div>
  );
};

export default Navbar;
