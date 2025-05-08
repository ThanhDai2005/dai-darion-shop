import { Grow, Rating, Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../service/ApiServices";
import BoxProduct from "../../components/BoxProduct";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, UPDATE_TO_CART } from "../../actions/cart";
import toast from "react-hot-toast";
import { ADD_TO_WISHLIST, DELETE_TO_WISHLIST } from "../../actions/wishList";

function DetailProduct() {
  const params = useParams();
  const [detailProduct, setDetailProduct] = useState("");
  const [tabActive, setTabActive] = useState("Description");
  const [similarProduct, setSimilarProduct] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishList = useSelector((state) => state.wishListReducer);
  const cart = useSelector((state) => state.CartReducer);
  const fetchAPI = async () => {
    const res = await ApiServices.DetailProduct(params.id);
    const resSimilar = await ApiServices.SimilarProduct(res.data.category);
    setDetailProduct(res.data);
    setSimilarProduct(resSimilar.data.products);
  };

  useEffect(() => {
    if (params.id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    fetchAPI();
  }, [params.id]);

  const handleCart = () => {
    if (token) {
      if (cart.some((data) => data.id == detailProduct.id)) {
        dispatch(UPDATE_TO_CART(detailProduct.id));
        toast.success("Đã thêm vào giỏ hàng");
      } else {
        dispatch(ADD_TO_CART(detailProduct.id, detailProduct));
        toast.success("Đã thêm vào giỏ hàng");
      }
    } else {
      navigate("/login");
    }
  };

  const handleWishList = () => {
    if (wishList.some((data) => data.id == detailProduct.id)) {
      dispatch(DELETE_TO_WISHLIST(detailProduct.id));
      toast.success("Đã bỏ sản phẩm yêu thích");
    } else {
      dispatch(ADD_TO_WISHLIST(detailProduct.id, detailProduct));
      toast.success("Đã thêm sản phẩm yêu thích");
    }
  };

  return (
    <>
      {detailProduct && similarProduct ? (
        <>
          <div className="container">
            <ul className="flex gap-2 py-4">
              <li>
                <Link className="text-sm">
                  <i className="icon fa fa-home"></i> /
                </Link>
              </li>
              <li>
                <span className="text-sm">Product /</span>
              </li>
              <li>
                <span className="text-sm">{detailProduct.title}</span>
              </li>
            </ul>
            <div className="grid-cols-5 mt-4 lg:grid gap-7">
              <Grow
                in={detailProduct}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000}
              >
                <div className="flex col-span-3 gap-3">
                  <ul className="flex flex-col gap-4">
                    {detailProduct.images.map((item) => (
                      <li className="p-[10px] w-[82px] h-[82px] border border-black rounded-md cursor-pointer">
                        <img className="object-cover image" src={item} />
                      </li>
                    ))}
                  </ul>
                  <div className="w-[300px] h-[300px] overflow-hidden">
                    <img
                      className="object-cover image"
                      src={detailProduct.thumbnail}
                    />
                  </div>
                </div>
              </Grow>
              <div className="col-span-2 mt-6">
                <h2 className="text-xl font-semibold lg:text-3xl">
                  {detailProduct.title}
                </h2>
                <div className="flex items-center mt-4">
                  <Rating
                    name="danh-gia"
                    value={detailProduct.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="mt-3 text-xl font-semibold">
                  ${detailProduct.price}
                </div>
                <div className="pt-2 mt-2 border-t border-gray">
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className="size-5 animate-flicker"
                      src="../assets/images/ico_eye.png"
                    />
                    <div className="text-sm font-medium">
                      35 people are viewing this right now
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      className="size-5 animate-zoomInOut"
                      src="../assets/images/ico_fire.png"
                    />
                    <div className="text-sm text-[#DC2626] font-medium">
                      35 sold in last 18 hours
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <img
                      className="size-5 "
                      src="../assets/images/ico_checked.png"
                    />
                    <div className="text-sm text-[#0ED678] font-medium">
                      In stock
                    </div>
                  </div>
                  <div className="mt-5 text-[#646464]">
                    {detailProduct.description}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleCart}
                      className="px-4 h-[50px] bg-black text-white rounded-full text-sm flex-grow font-semibold hover:bg-white hover:border hover:border-black hover:text-black transition-all"
                    >
                      Add To Carts
                    </button>
                    <button
                      onClick={handleWishList}
                      className={`p-4 border rounded-full border-[#ebebe9] ${
                        wishList.some((data) => data.id == detailProduct.id)
                          ? "bg-red-500"
                          : ""
                      }`}
                    >
                      <img
                        className="size-4"
                        src="../assets/images/ico_heart.png"
                      />
                    </button>
                  </div>
                  <ul className="flex items-center gap-4 mt-6">
                    <li>
                      <button className="flex items-center gap-4 ">
                        <img
                          className="size-4"
                          src="../assets/images/ico_reload.png"
                        />
                        <span className="text-sm font-medium">Compare</span>
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-4 ">
                        <img
                          className="size-4"
                          src="../assets/images/ico_question.png"
                        />
                        <span className="text-sm font-medium">Question</span>
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-4 ">
                        <img
                          className="size-4"
                          src="../assets/images/ico_shipping.png"
                        />
                        <span className="text-sm font-medium">
                          Shipping info
                        </span>
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-4 ">
                        <img
                          className="size-4"
                          src="../assets/images/ico_share.png"
                        />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </li>
                  </ul>
                  <div className="my-6 py-6 border-y border-[#ebebe9] flex items-center">
                    <div>
                      <img
                        src="../assets/images/ico_shipping2.png"
                        className="size-9"
                      />
                    </div>
                    <div className="ml-4 pl-4 border-l border-[#d9d9d9] text-sm">
                      Order in the next 22 hours 45 minutes to get it between
                      <br />
                      <span className="font-semibold underline">
                        Tuesday, Oct 22
                      </span>
                      <span className="mx-2"> and </span>
                      <span className="font-semibold underline">
                        Saturday, Oct 26
                      </span>
                    </div>
                  </div>
                  <div className="p-[15px] flex gap-3 border border-[#ebebe9] rounded-xl ">
                    <img
                      className="size-6"
                      src="../assets/images/ico_check.png"
                    />
                    <div>
                      <span className="text-sm text-[#8a8a8a]">
                        Pickup available at
                      </span>
                      <span className="text-sm font-bold"> Akaze store</span>
                      <p className="mt-1 text-xs text-[#8a8a8a]">
                        Usually ready in 24 hours
                      </p>
                      <button className="mt-4 text-xs underline">
                        View store information
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 p-6 bg-[#F6F6F6] text-center rounded-lg">
                    <p className="text-sm tracking-widest">
                      Guaranteed Checkout
                    </p>
                    <img
                      className="mt-3"
                      src="../assets/images/img_payment.avif"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24 text-center">
              <ul className="flex items-center justify-center gap-6">
                {["Description", "Review", "Shipping", "Return"].map(
                  (item, index) => (
                    <li key={index}>
                      <button
                        className={`text-lg py-2 px-4 font-semibold rounded-full transition-all ${
                          item == tabActive
                            ? "bg-black text-white"
                            : "text-[#8a8a8a] hover:text-black"
                        } }`}
                        onClick={() => setTabActive(item)}
                      >
                        {item}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="mt-20 text-center">
              {tabActive == "Description" && (
                <>
                  <p className="text-[#8a8a8a]">
                    Get a fresh fit for spring with the Free People Love Letter
                    Ivory Floral Jacquard Cropped Cami Top!
                  </p>
                  <p className="text-[#8a8a8a] mt-9">
                    This top is perfect for casual outings or even dressed-up
                    occasions.
                  </p>
                </>
              )}
              {tabActive == "Review" && (
                <>
                  <p className="text-[#8a8a8a] mt-20">
                    Customers have rated this product highly for its design and
                    comfort.
                  </p>
                </>
              )}
              {tabActive == "Shipping" && (
                <>
                  <p className="text-[#8a8a8a] mt-20">
                    Free shipping is available for orders over $50. Standard
                    delivery takes 3-5 business days.
                  </p>
                </>
              )}
              {tabActive == "Return" && (
                <>
                  <p className="text-[#8a8a8a] mt-20">
                    We accept returns within 30 days of purchase. Ensure items
                    are in their original condition.
                  </p>
                </>
              )}
            </div>
            <div className="mt-24 mb-24">
              <h1 className="text-3xl font-bold text-center">
                Sản phẩm liên quan
              </h1>
              <ul className="grid grid-cols-2 gap-10 mt-6 lg:grid-cols-4">
                {similarProduct.slice(0, 5).map((item, index) => (
                  <BoxProduct item={item} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={!detailProduct}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </>
  );
}

export default DetailProduct;
