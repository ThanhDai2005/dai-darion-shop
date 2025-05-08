import { Link } from "react-router-dom";
import BoxProduct from "../BoxProduct";
import { useState } from "react";
import { useEffect } from "react";
import ApiServices from "../../service/ApiServices";

function NewArrivalsProduct() {
  const [newArrivals, setNewArrivals] = useState([]);

  const fetchAPI = async () => {
    const res = await ApiServices.ListProduct();
    setNewArrivals(res.data.products);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <section className="bg-[#EBEBE9]">
        <div className="container pt-16 pb-8">
          <div className="items-end justify-between lg:flex">
            <div>
              <h1 className="text-3xl font-bold">New Arrivals</h1>
              <p className="mt-2 text-[#8a8a8a]">
                Experience the best products at our store!
              </p>
            </div>
            <Link
              className="rounded-full text-[15px] px-7 h-9 bg-white border border-black inline-flex justify-center items-center font-semibold mt-6 lg:mt-0"
              to="/product"
            >
              View All
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-10 mt-6 lg:grid-cols-4">
            {newArrivals.slice(6, 10).map((item, index) => (
              <BoxProduct item={item} key={index} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default NewArrivalsProduct;
