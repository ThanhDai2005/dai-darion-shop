import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BoxProduct from "../components/BoxProduct";
import { Pagination } from "@mui/material";

function WishListPage() {
  const wishList = useSelector((state) => state.wishListReducer);

  return (
    <>
      {wishList.length > 0 ? (
        <section className="pb-12 bg-[#ebebeb]">
          <div className="container">
            <ul className="flex gap-2 py-4">
              <li>
                <Link to="/" className="text-sm">
                  <i class="icon fa fa-home"></i> /
                </Link>
              </li>
              <li>
                <span className="text-sm">Wish-List</span>
              </li>
            </ul>

            <ul className="grid grid-cols-2 gap-4 mt-6 lg:grid-cols-4">
              {wishList.map((item, index) => (
                <BoxProduct item={item.info} key={index} />
              ))}
            </ul>

            <Pagination
              className="flex items-center justify-center mt-10"
              count={10}
              page={1}
              variant="outlined"
            ></Pagination>
          </div>
        </section>
      ) : (
        <div className="my-[50px] text-center">
          Bạn chưa có sản phẩm yêu thích
        </div>
      )}
    </>
  );
}

export default WishListPage;
