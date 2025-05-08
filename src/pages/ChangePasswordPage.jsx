import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import ApiServices from "../service/ApiServices";
import toast from "react-hot-toast";

function ChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrorS = {};
    if (!data.password_current) {
      newErrorS.password_current = "Password không được để trống";
    } else if (data.password_current.length < 6) {
      newErrorS.password_current = "Password phải có ít nhất 6 ký tự";
    }
    if (!data.password) {
      newErrorS.password = "Password không được để trống";
    } else if (data.password.length < 6) {
      newErrorS.password = "Password phải có ít nhất 6 ký tự";
    }
    if (!data.password_confirmation) {
      newErrorS.password_confirmation = "Password không được để trống";
    } else if (data.password_confirmation !== data.password) {
      newErrorS.password_confirmation = "Xác nhận mật khẩu chưa khớp!";
    }
    setErrors(newErrorS);
    return Object.keys(newErrorS).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    } else {
      try {
        const res = await ApiServices.changePassword(data);
        console.log(res.data);
        if (res) {
          toast.success("Thay đổi mật khẩu thành công");
        }
      } catch (error) {
        toast.error("Thay đổi mật khẩu thất bại");
        console.log(error);
      }
    }
  };

  return (
    <>
      <section className="pt-20 pb-24">
        <div className="container">
          <h1 className="text-3xl font-semibold text-center">
            Change Password
          </h1>
          <form className="max-w-xl mx-auto mt-5" onSubmit={handleSubmit}>
            <div className="relative mt-3">
              <input
                className="mt-2 px-4 w-full h-[50px] text-sm border border-[#ebebeb] rounded-lg"
                name="password_current"
                type={showPassword ? "text" : "password"}
                placeholder="Password current*"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute z-10 top-5 right-4"
                onClick={handleShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
              {errors.password_current && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password_current}
                </p>
              )}
            </div>
            <div className="relative mt-3">
              <input
                className="mt-2 px-4 w-full h-[50px] text-sm border border-[#ebebeb] rounded-lg"
                name="password"
                type={showPassword1 ? "text" : "password"}
                placeholder="Password new*"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute z-10 top-5 right-4"
                onClick={handleShowPassword1}
              >
                {showPassword1 ? <Visibility /> : <VisibilityOff />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="relative mt-3">
              <input
                className="mt-2 px-4 w-full h-[50px] text-sm border border-[#ebebeb] rounded-lg"
                name="password_confirmation"
                type={showPassword2 ? "text" : "password"}
                placeholder="Password Confirmation*"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute z-10 top-5 right-4"
                onClick={handleShowPassword2}
              >
                {showPassword2 ? <Visibility /> : <VisibilityOff />}
              </button>
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password_confirmation}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="my-5 px-4 w-full h-[50px] rounded-lg bg-black text-white text-sm font-semibold border hover:border-black hover:bg-white hover:text-black transition-all"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ChangePasswordPage;
