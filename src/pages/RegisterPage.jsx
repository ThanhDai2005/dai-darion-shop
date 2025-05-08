import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiServices from "../service/ApiServices";
import toast from "react-hot-toast";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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
    const phoneRegex = /^[0-9]{10}$/;
    const newErrorS = {};
    if (!data.name) {
      newErrorS.name = "Tên không được để trống!";
    }
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
    if (!data.phone) {
      newErrorS.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(data.phone)) {
      newErrorS.phone = "Số điện thoại phải là 10 chữ số!";
    }
    if (!data.address) {
      newErrorS.address = "Địa chỉ không được để trống!";
    }
    setErrors(newErrorS);
    return Object.keys(newErrorS).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    } else {
      try {
        const res = await ApiServices.register(data);
        if (res) {
          toast.success("Đăng ký thành công");
          navigate("/login");
        }
      } catch (error) {
        toast.success("Đăng ký thành công");
        navigate("/login");
        console.log("Lỗi trong quá trình đăng ký:", error);
      }
    }
  };

  return (
    <>
      <section>
        <div className="container pt-20 pb-24 ">
          <h2 className="text-3xl font-semibold text-center">Register</h2>
          <form className="max-w-xl mx-auto mt-5" onSubmit={handleRegister}>
            <div>
              <input
                className="mt-3 p-5 h-[50px] w-full border border-[#ebebeb] rounded-lg text-sm"
                type="text"
                name="name"
                placeholder="Name*"
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                className="mt-3 p-5 h-[50px] w-full border border-[#ebebeb] rounded-lg text-sm"
                type="text"
                name="email"
                placeholder="Email*"
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="relative mt-3">
              <input
                className="mt-2 px-4 h-[50px] w-full border border-[#ebebeb] rounded-lg text-sm"
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <input
                className="mt-3 p-5 h-[50px] w-full border border-[#ebebeb] rounded-lg text-sm"
                type="text"
                name="phone"
                placeholder="Phone*"
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <input
                className="mt-3 p-5 h-[50px] w-full border border-[#ebebeb] rounded-lg text-sm"
                type="text"
                name="address"
                placeholder="Address*"
                onChange={handleChange}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="my-5 px-4 h-[50px] w-full bg-black text-white rounded-lg text-sm font-semibold border hover:border-black hover:text-black hover:bg-white transition-all"
              >
                SUBMIT
              </button>
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm">Bạn đã có tài khoản?</div>
              <Link
                to="/login"
                className="my-5 block hover:underline hover:text-[blue]"
              >
                Đăng nhập tại đây
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
