import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import ApiServices from "../../service/ApiServices";
import BoxProduct from "../BoxProduct";

function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);

  const fetchAPI = async () => {
    const res = await ApiServices.ListProduct();
    setBestSeller(res.data.products);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <section className="mt-24 bg-[#EBEBE9]">
        <div className="container py-8 pt-16 ">
          <div className="items-end justify-between lg:flex">
            <div>
              <h1 className="text-3xl font-bold">Bestseller</h1>
              <p className="mt-2 text-[#8a8a8a]">
                Experience the best products at our store!
              </p>
            </div>
            <Link
              className="inline-flex items-center justify-center font-semibold bg-white border border-black rounded-full px-7 h-9 text-[15px] mt-6 lg:mt-0"
              to="/product"
            >
              View All
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-10 mt-6 lg:grid-cols-4">
            {bestSeller.slice(1, 5).map((item, index) => (
              <BoxProduct key={index} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default BestSeller;
