import { useEffect } from "react";
import { useState } from "react";
import ApiServices from "../service/ApiServices";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const obj = {
      ...data,
      [name]: value,
    };
    setData(obj);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await ApiServices.getInfo();
      setData(res.data.data);
    };
    fetchAPI();
  }, []);

  console.log(data); // Xem data cũ lấy từ api get info

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiServices.updateProfile(data);
      console.log(res.data); // cập nhật data mới từ update profile
      if (res) {
        toast.success("Cập nhật thông tin thành công");
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Hãy điền đầy đủ thông tin");
    }
  };

  return (
    <>
      <section className="pt-20 pb-24">
        <div className="container">
          <h1 className="text-3xl font-semibold text-center">Information</h1>
          <form
            onSubmit={handleUpdateProfile}
            className="mt-5 w-[576px] mx-auto"
          >
            <div>
              <input
                className="mt-3 p-5 h-[50px] text-sm border border-[#ebebeb] rounded-lg w-full "
                name="name"
                placeholder="Name*"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="mt-3 p-5 h-[50px] text-sm border border-[#ebebeb] rounded-lg w-full "
                name="phone"
                placeholder="Phone*"
                value={data.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="mt-3 p-5 h-[50px] text-sm border border-[#ebebeb] rounded-lg w-full "
                name="address"
                placeholder="Address*"
                value={data.address}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="my-5 w-full text-sm font-semibold h-[50px] px-4 rounded-lg bg-black text-white border hover:bg-white hover:border-black hover:text-black transition-all"
            >
              UPDATE PROFILE
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
