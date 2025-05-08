import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import ApiServices from "../service/ApiServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { checkLogin } from "../actions/login";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const obj = {
      ...data,
      [name]: value,
    };
    setData(obj);

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrorS = {};

    if (!data.email) {
      newErrorS.email = "Email không được để trống!";
    } else if (!emailRegex.test(data.email)) {
      newErrorS.email = "Email không hợp lệ!";
    }
    if (!data.password) {
      newErrorS.password = "Mật khẩu không được để trống!";
    } else if (data.password.length < 6) {
      newErrorS.password = "Mật khẩu phải có ít nhất 6 ký tự!";
    }

    setErrors(newErrorS);
    return Object.keys(newErrorS).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    } else {
      try {
        const res = await ApiServices.login(data);
        console.log(res);
        if (res) {
          const userName = data.email.split("@")[0];
          const token = res.data.access_token;
          localStorage.setItem("userName", userName);
          localStorage.setItem("token", token);
          toast.success("Đăng nhập thành công");
          dispatch(checkLogin(true));
          navigate("/");
        }
      } catch (error) {
        toast.error("Đăng nhập thất bại");
        console.log("Đã có lỗi xảy ra khi đăng nhập:", error);
      }
    }
  };

  return (
    <>
      <section>
        <div className="container pt-20 pb-24">
          <h2 className="text-3xl font-semibold text-center">Login</h2>
          <form className="max-w-xl mx-auto mt-5 " onSubmit={handleLogin}>
            <div>
              <input
                className="mt-2 p-5 h-[50px] border border-[#ebebe9] rounded-lg text-sm w-full"
                type="text"
                name="email"
                placeholder="Email*"
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
            <div className="relative mt-3">
              <input
                className="mt-2 px-4 h-[50px] border border-[#ebebe9] rounded-lg text-sm w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password*"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute z-10 right-4 top-5"
                onClick={handleShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
            <div>
              <button
                type="submit"
                className="px-4 my-5 h-[50px] w-full text-sm font-semibold text-white bg-black rounded-lg transition-all hover:bg-white hover:text-black border hover:border-black"
              >
                SUBMIT
              </button>
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm">Bạn chưa có tài khoản?</div>
              <Link
                to="/register"
                className="block my-5 hover:underline hover:text-[blue]"
              >
                Đăng ký tại đây
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
