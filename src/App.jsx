// Components
import Dashboard from "./components/Dashboard/Dashboard";
import privateRoute from "./components/PrivateRoute/privateRoute";

// React toastify library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {


  const ProtectedDashboard = privateRoute(Dashboard);

  return (
    <>
      <ProtectedDashboard/>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
