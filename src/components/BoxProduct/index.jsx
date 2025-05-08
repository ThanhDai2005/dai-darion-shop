import { Link, useNavigate } from "react-router-dom";
import { Grow, Rating, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_WISHLIST, DELETE_TO_WISHLIST } from "../../actions/wishList";
import toast from "react-hot-toast";
import { ADD_TO_CART, UPDATE_TO_CART } from "../../actions/cart";

function BoxProduct(props) {
  const { item } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const wishList = useSelector((state) => state.wishListReducer);
  const cart = useSelector((state) => state.CartReducer);

  useEffect(() => {
    if (item) {
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    }
  }, [item]);

  const handleWishList = () => {
    if (wishList.some((data) => data.id == item.id)) {
      dispatch(DELETE_TO_WISHLIST(item.id));
      toast.success("Đã bỏ sản phẩm yêu thích");
    } else {
      dispatch(ADD_TO_WISHLIST(item.id, item));
      toast.success("Đã thêm sản phẩm yêu thích");
    }
  };

  const handleCart = () => {
    if (token) {
      if (cart.some((data) => data.id == item.id)) {
        dispatch(UPDATE_TO_CART(item.id));
        toast.success("Đã thêm vào giỏ hàng");
      } else {
        dispatch(ADD_TO_CART(item.id, item));
        toast.success("Đã thêm vào giỏ hàng");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Grow in={item} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <li className="relative text-center group" key={item.id}>
              <span className="absolute px-2 py-1 text-xs text-white bg-red-600 rounded-full left-3 top-3">
                {item.discountPercentage}%
              </span>
              <ul className="absolute z-10 flex flex-col gap-3 left-4 bottom-28">
                <li className="transition-all duration-200 delay-200 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <button
                    onClick={handleWishList}
                    type="button"
                    className="block p-3 transition-all bg-white rounded-full shadow-lg hover:bg-slate-200"
                  >
                    <img
                      className={`image size-4 rounded-full ${
                        wishList.some((data) => data.id == item.id)
                          ? "ico_heart_red"
                          : ""
                      }`}
                      src={`../assets/images/${
                        wishList.some((data) => data.id == item.id)
                          ? "ico_heart_red.png"
                          : "ico_heart.png"
                      }`}
                    />
                  </button>
                </li>
                <Link
                  to={`/product/${item.id}`}
                  className="transition-all duration-200 delay-200 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <button
                    type="button"
                    className="block p-3 transition-all bg-white rounded-full shadow-lg hover:bg-slate-200"
                  >
                    <img
                      className="rounded-full image size-4"
                      src="../assets/images/ico_search.png"
                    />
                  </button>
                </Link>
              </ul>
              <Link to={`/product/${item.id}`}>
                <div className="overflow-hidden bg-white rounded-xl lg:h-[385px]">
                  <img className="object-cover image " src={item.thumbnail} />
                </div>
              </Link>
              <div className="flex items-center justify-center mt-5">
                <Rating
                  name="danh-gia"
                  defaultValue={item.rating}
                  precision={0.5}
                  readOnly
                />
              </div>
              <h3 className="mt-2 text-[15px]">{item.title}</h3>
              <div className="relative h-5 mt-2 overflow-hidden">
                <div className="absolute transition-all duration-300 -translate-x-1/2 -bottom-5 left-1/2 group-hover:bottom-0">
                  <div className=" font-bold text-red-600 text-[15px]">
                    ${item.price}
                  </div>
                  <button
                    onClick={handleCart}
                    className="text-xs uppercase font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          </Grow>
        </>
      ) : (
        <>
          <li className="relative text-center group" key={item.id}>
            <div className="overflow-hidden bg-white rounded-xl lg:h-[385px]">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
            <Skeleton />
            <Skeleton width="100%" />
          </li>
        </>
      )}
    </>
  );
}

export default BoxProduct;
