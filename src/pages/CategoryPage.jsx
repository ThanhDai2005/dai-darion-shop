import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoxProduct from "../components/BoxProduct";
import axios from "axios";
import { Pagination } from "@mui/material";

function CategoryPage() {
  const params = useParams();
  const [productCategory, setProductCategory] = useState([]);
  const [sortProductCategory, setSortProductCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const LoadData = async () => {
    const limit = 12;
    const skip = (page - 1) * limit;
    if (sortProductCategory == "") {
      const res = await axios(
        `https://dummyjson.com/products/category/${params.categoryName}?limit=${limit}&skip=${skip}`
      );
      setProductCategory(res.data.products);
      setTotalPage(Math.ceil(res.data.total / limit));
    } else {
      const res = await axios(
        `https://dummyjson.com/products/category/${params.categoryName}?sortBy=price&order=${sortProductCategory}&limit=${limit}&skip=${skip}`
      );
      setProductCategory(res.data.products);
      setTotalPage(Math.ceil(res.data.total / limit));
    }
  };

  useEffect(() => {
    LoadData();
  }, [sortProductCategory, page]);

  const handleChangeProduct = (e) => {
    setSortProductCategory(e.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <section className="bg-[#EBEBE9] pb-12">
        <div className="container">
          <ul className="flex gap-2 py-4">
            <li>
              <Link to="/" className="text-sm">
                <i className="icon fa fa-home"></i>/
              </Link>
            </li>
            <li>
              <span className="text-sm">Category /</span>
            </li>
            <li>
              <span className="text-sm">{params.categoryName}</span>
            </li>
          </ul>
          <div className="mt-6">
            <div className="px-3 py-2 bg-[#ebebe9] border border-black rounded-full w-max  cursor-pointer">
              <select
                className="bg-[#ebebe9] text-sm"
                onChange={handleChangeProduct}
              >
                <option value="">New Latest</option>
                <option value="asc">Price, low to high</option>
                <option value="desc">Price, high to low</option>
              </select>
            </div>
            <ul className="grid grid-cols-2 gap-4 mt-6 lg:grid-cols-4">
              {productCategory.map((item, index) => (
                <BoxProduct item={item} key={index} />
              ))}
            </ul>
            <Pagination
              className="flex justify-center mt-10"
              count={totalPage}
              page={page}
              variant="outlined"
              onChange={handleChangePage}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default CategoryPage;
