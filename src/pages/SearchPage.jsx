import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import BoxProduct from "../components/BoxProduct";
import { Pagination } from "@mui/material";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchProduct, setSearchProduct] = useState([]);
  const [sortSearchProduct, setSortSearchProduct] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const title = searchParams.get("q") || "";

  const fetchAPI = async () => {
    const limit = 12;
    const skip = (page - 1) * limit;
    if (sortSearchProduct == "") {
      const res = await axios(
        `https://dummyjson.com/products/search?q=${title}&limit=${limit}&skip=${skip}`
      );
      setSearchProduct(res.data.products);
      setTotalPage(Math.ceil(res.data.total / limit));
    } else {
      const res = await axios(
        `https://dummyjson.com/products/search?q=${title}&sortBy=price&order=${sortSearchProduct}&limit=${limit}&skip=${skip}`
      );
      setSearchProduct(res.data.products);
      setTotalPage(Math.ceil(res.data.total / limit));
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [title, sortSearchProduct, page]);

  const handleSortProduct = (e) => {
    setSortSearchProduct(e.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {searchProduct.length > 0 ? (
        <>
          <section className="bg-[#ebebeb] pb-12">
            <div className="container">
              <ul className="flex items-center gap-2 py-4">
                <li>
                  <Link to="/" className="text-sm">
                    <i className="fa fa-home" aria-hidden="true"></i> /
                  </Link>
                </li>
                <li>
                  <span className="text-sm">Search</span>
                </li>
              </ul>
              <div className="mt-6">
                <div className="px-3 py-2 border border-black rounded-full w-max">
                  <select
                    className="text-sm bg-[#ebebeb]"
                    onChange={handleSortProduct}
                  >
                    <option value="">New Latest</option>
                    <option value="asc">Price, low to high</option>
                    <option value="desc">Price, high to low</option>
                  </select>
                </div>
                <ul className="grid grid-cols-2 gap-4 mt-6 lg:grid-cols-4">
                  {searchProduct.map((item, index) => (
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
      ) : (
        <>
          <div className="py-[50px] text-center">
            Không tìm thấy bất kỳ kết quả nào với từ khóa trên. Mời bạn tìm kiếm
            sản phẩm khác !
          </div>
        </>
      )}
    </>
  );
}

export default SearchPage;
