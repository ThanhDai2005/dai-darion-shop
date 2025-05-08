import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
  const isLogin = useSelector((state) => state.LoginReducer);
  const token = localStorage.getItem("token");

  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRouter;
