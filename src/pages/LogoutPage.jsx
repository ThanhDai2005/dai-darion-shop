import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { checkLogin } from "../actions/login";

function LogOutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    navigate("/");
    dispatch(checkLogin(false));
    toast.success("Đăng xuất thành công");
  }, []);

  return <></>;
}

export default LogOutPage;
