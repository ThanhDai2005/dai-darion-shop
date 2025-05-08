import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";
import { DELETE_ALL } from "../actions/cart";

function OrderPage() {
  const cart = useSelector((state) => state.CartReducer);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.info.price * item.quantity,
    0
  );

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
    const newErrors = {};
    if (!data.delivery) {
      newErrors.delivery = "Bạn phải chọn hình thức nhận hàng!";
    }
    if (!data.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Email không hợp lệ!";
    }
    if (!data.firstName) {
      newErrors.firstName = "firstName không được để trống!";
    }
    if (!data.lastName) {
      newErrors.lastName = "lastName không được để trống!";
    }
    if (!data.address) {
      newErrors.address = "Địa chỉ không được để trống!";
    }
    if (!data.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(data.phone)) {
      newErrors.phone = "Số điện thoại phải là 10 chữ số!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    // Tạo nội dung email
    const emailData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      to_email: data.email,
      address: data.address,
      phone: data.phone,
      postalCode: data.postalCode || "N/A",
      total: `${totalPrice}$`,
      cartItems: cart
        .map(
          (item) =>
            `- ${item.info.title} x${item.quantity} ($${item.info.price})`
        )
        .join("\n"),
      delivery:
        data.delivery === "ship" ? "Ship COD" : "Lấy sản phẩm tại cửa hàng",
    };

    try {
      await emailjs.send(
        "service_6dmyr9s", // Service ID
        "template_pxnc3bv", // Template ID
        emailData, // Email data
        "pzZmnl6pZrRtWBPM6" // User ID
      );
      toast.success("Đặt hàng thành công");
      navigate("/");
      dispatch(DELETE_ALL());
    } catch (error) {
      console.log(error);
      toast.error("Đặt hàng thất bại! Mời bạn mua hàng lại!");
    }
  };

  return (
    <>
      <section className="pt-16">
        <div className="container">
          <h1 className="text-3xl font-semibold text-center">Payment Order</h1>
          <div className="grid-cols-2 gap-8 mt-10 lg:grid">
            <div>
              <div className="text-lg font-semibold">Delivery</div>
              <div className="flex items-center gap-2 mt-3">
                <input
                  className="cursor-pointer size-4"
                  id="ship"
                  type="radio"
                  name="delivery"
                  value="ship"
                  onChange={handleChange}
                />
                <label htmlFor="ship" className="text-sm cursor-pointer">
                  Ship
                </label>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input
                  className="cursor-pointer size-4"
                  id="pick"
                  name="delivery"
                  type="radio"
                  value="pick"
                  onChange={handleChange}
                />
                <label htmlFor="pick" className="text-sm cursor-pointer">
                  Pick up in store
                </label>
              </div>
              {errors.delivery && (
                <p className="mt-1 text-sm text-red-500">{errors.delivery}</p>
              )}
              <div className="mt-5">
                <div className="text-lg font-semibold">Contact</div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <input
                      className="mt-2 p-5 w-full h-[50px] border border-[#ebebeb] rounded-lg text-sm"
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      className="mt-2 p-5 w-full h-[50px] border border-[#ebebeb] rounded-lg text-sm"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      className="mt-2 p-5 w-full h-[50px] border border-[#ebebeb] rounded-lg text-sm"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      className="p-5 w-full h-[50px] border border-[#ebebeb] rounded-lg text-sm"
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      className="mt-2 p-5 w-full h-[50px] border border-[#ebebeb] rounded-lg text-sm"
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="p-4 w-full h-[55px] bg-black text-white text-sm font-semibold rounded-lg border hover:border-black hover:bg-white hover:text-black transition-all"
                  >
                    ORDER NOW
                  </button>
                  <p className="text-center">
                    Back to{" "}
                    <Link to="/" className="underline text-[#0000ff]">
                      Home
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:p-10">
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <img className="image_cart" src={item.info.thumbnail} />
                    <p>{item.info.title}</p>
                    <span className="ml-auto">
                      ${item.info.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="flex items-center justify-between mt-6">
                <div className="text-lg font-bold">Total:</div>
                <div className="text-lg font-bold">${totalPrice}</div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderPage;
