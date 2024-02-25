
import Cookie from "js-cookie";

import { toast } from "react-toastify";
import SignUpLogIn from "../SignUpLogInForm/SignUpLogIn";

const privateRoute = (WrappedComponent) => {

  const token = localStorage.getItem('token');

  return ()=>{
    if(!token)
    {
      toast.warn("Please Login/Signup !");
      return <SignUpLogIn/>
    }
    return <WrappedComponent />;

   }


};

export default privateRoute;
