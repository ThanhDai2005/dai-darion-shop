import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

function ContactPage() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

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
    const phoneRegex = /^[0-9]{10}$/;
    const newErrors = {};

    if (!data.name) {
      newErrors.name = "Họ tên không được để trống";
    }
    if (!data.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!phoneRegex.test(data.phone)) {
      newErrors.phone = "Số điện thoại phải là 10 chữ số";
    }
    if (!data.address) {
      newErrors.address = "Địa chỉ không được để trống";
    }
    if (!data.content) {
      newErrors.content = "Nội dung không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    } else {
      const emailData = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        content: data.content,
      };

      try {
        await emailjs.send(
          "service_6dmyr9s", // ID của service email
          "template_vadusoe", // ID của template email
          emailData, // Dữ liệu email
          "pzZmnl6pZrRtWBPM6" // User ID của bạn trong EmailJS
        );
        toast.success("Gởi thông tin thành công");
      } catch (error) {
        console.log(error);
        toast.error("Gửi thông tin thất bại");
      }
    }
  };

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <ul className="flex gap-2 py-4">
            <li>
              <Link className="text-sm" to="/">
                <i className="icon fa fa-home"></i> /
              </Link>
            </li>
            <li>
              <span className="text-sm">Contact</span>
            </li>
          </ul>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Hệ thống cửa hàng DARION chính hãng
              </h3>
              <div className="mb-4">
                <div className="font-bold">
                  Cơ sở 1: Số 33, Hàng Bông, Hoàn Kiếm, Hà Nội
                </div>
                <div>0243.828.3930 – 097.187.3939</div>
                <div>Open: Thứ Hai – Chủ Nhật từ 8am – 21pm</div>
              </div>
              <div className="mb-4">
                <div className="font-bold">
                  Cơ sở 2: Số 56, Lê Hồng Phong, Ba Đình, Hà Nội
                </div>
                <div>0246.292.3216</div>
                <div>Open: Thứ Hai – Chủ Nhật từ 8am – 21pm</div>
              </div>
              <div className="mb-4">
                <div className="font-bold">
                  Cơ sở 3: Ngõ 27B, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội
                </div>
                <div>0243.632.0562</div>
                <div>Open: Thứ Hai – Chủ Nhật từ 8am – 17pm</div>
              </div>
              <div className="mb-4">
                <div className="font-bold">
                  Cơ sở 4: Số 9, Hồ Tùng Mậu, TP. Vinh, Nghệ An
                </div>
                <div>0985.120.505</div>
                <div>Open: Thứ Hai – Chủ Nhật từ 8am – 17pm</div>
              </div>
              <h3 className="mb-4 text-lg font-semibold">
                Liên hệ với chúng tôi:
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    className="w-full p-2 border border-black"
                    name="name"
                    placeholder="Họ và tên..."
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    className="w-full p-2 border border-black"
                    name="phone"
                    placeholder="Số diện thoại..."
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    className="w-full p-2 border border-black"
                    name="address"
                    placeholder="Địa chỉ của bạn..."
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border border-black"
                    name="content"
                    placeholder="Nội dung liên hệ..."
                    onChange={handleChange}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.content}
                    </p>
                  )}
                </div>
                <button
                  type="onsubmit"
                  className="px-4 py-2 text-white bg-red-600"
                >
                  GỬI LIÊN HỆ
                </button>
              </form>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">CÓ GÌ MỚI TUẦN NÀY?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/umoi5sGBggIqNFlCsUwHirgptfZPFwc2sfCmF2eeSO5HXVMQB.jpg"
                  />
                  <p>Đầm maxi gile cam đầm eo Hotpink</p>
                  <p className="font-bold text-red-600">1.099.000₫</p>
                </div>
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/e3veMstGUEjKC0xwnkQqQziwAeNzD6qVAYHz78vNh2xmrKGoA.jpg"
                  />
                  <p>Đầm maxi 2 dây cổ vuông Red Floral</p>
                  <p className="font-bold text-red-600">1.399.000₫</p>
                </div>
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/freiZFqfMEFZmIKfHfFlo2V9hj2rejyRaCGxjDHd4qonaVxAF.jpg"
                  />
                  <p>Áo vest 2 túi ốp Fuschia</p>
                  <p className="font-bold text-red-600">1.099.000₫</p>
                </div>
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/qQLhrVzHMGJLFlkfvDsEhnHQ3URaAmXXSU7CTPViW8XyqiBKA.jpg"
                  />
                  <p>Áo vest 2 túi ốp Lime</p>
                  <p className="font-bold text-red-600">1.399.000₫</p>
                </div>
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/eolelAQMWQlThkE057LS3aDjA0WQs7bhL6eWHgOKuljNrKGoA.jpg"
                  />
                  <p>Vest hoa cổ 2 vò túi ốp Print</p>
                  <p className="font-bold text-red-600">1.599.000₫</p>
                </div>
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/GwuSJvYWI4q2Il0lHH6yeLzar6e582GD6TCSnWS8TN8sVFDUA.jpg"
                  />
                  <p>Đầm gile cao cổ chân váy xòe Black</p>
                  <p className="font-bold text-red-600">949.000₫</p>
                </div>
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/mFYecO5RBHVvMaCk94Fu1iC0aaYfW26HehIyrSJcmxBHrKGoA.jpg"
                  />
                  <p>Áo nhung hoa Navy Floral</p>
                  <p className="font-bold text-red-600">699.000₫</p>
                </div>
                <div className="text-center">
                  <img
                    className="w-full"
                    src="https://storage.googleapis.com/a1aa/image/Bd8xteYFwZVjTiqxlLoZeG7UYun4pYLZeXZVSPI0wQcfWVMQB.jpg"
                  />
                  <p>Áo cổ chữ B tay lỡ Plum</p>
                  <p className="font-bold text-red-600">799.000₫</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
