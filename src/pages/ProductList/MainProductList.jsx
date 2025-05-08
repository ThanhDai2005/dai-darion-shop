import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../service/ApiServices";
import axios from "axios";
import BoxProduct from "../../components/BoxProduct";
import { Pagination } from "@mui/material";

function MainProductList() {
  const [listCategory, setListCategory] = useState([]);

  const fetchAPI = async () => {
    const res = await ApiServices.ListCategories();
    setListCategory(res.data);
  };

  const [sortProduct, setSortProduct] = useState("");
  const [resultSort, setResultSort] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const loadData = async () => {
    const limit = 12;
    const skip = (page - 1) * limit;
    if (sortProduct == "") {
      const res = await axios(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      setResultSort(res.data.products);
      setTotalPage(Math.ceil(res.data.total / limit));
    } else {
      const res = await axios(
        `https://dummyjson.com/products?sortBy=price&order=${sortProduct}&limit=${limit}&skip=${skip}`
      );
      setResultSort(res.data.products);
      setTotalPage(Math.ceil(res.data.total / limit));
    }
  };

  const handleSortChange = (e) => {
    setSortProduct(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchAPI();
    loadData();
  }, [page, sortProduct]);

  return (
    <>
      <section className="bg-[#EBEBE9]">
        <div className="container py-12">
          <div className="grid-cols-5 lg:grid">
            <div className="col-span-1 p-4 ">
              <h2 className="text-lg font-bold">Category</h2>
              <ul className="mt-4 space-y-3">
                {listCategory.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/category/${item.slug}`}
                      className="text-sm font-medium hover:text-white  hover:bg-black hover:p-[10px] transition-all "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4 mt-6 lg:mt-0">
              <div className="px-3 py-2 border border-black rounded-full w-max">
                <select
                  onChange={handleSortChange}
                  className="bg-[#EBEBE9] text-sm"
                >
                  <option value="">New Latest</option>
                  <option value="asc">Price, low to high</option>
                  <option value="desc">Price, high to low</option>
                </select>
              </div>
              <ul className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
                {resultSort.map((item, index) => (
                  <BoxProduct item={item} key={index} />
                ))}
              </ul>
              <ul className="flex items-center justify-center mt-10">
                <Pagination
                  count={totalPage}
                  page={page}
                  variant="outlined"
                  onChange={handlePageChange}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainProductList;
