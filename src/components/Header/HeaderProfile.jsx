import { Link } from "react-router-dom";
import MenuAccount from "./MenuAccount";
import { useSelector } from "react-redux";

function HeaderProfile() {
  const isLogin = useSelector((state) => state.LoginReducer);
  const token = localStorage.getItem("token");
  const wishList = useSelector((state) => state.wishListReducer);
  const cart = useSelector((state) => state.CartReducer);

  let countQuantity = 0;

  if (token) {
    countQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  } else {
    countQuantity = 0;
  }

  return (
    <>
      <div className="flex items-center gap-6 ml-auto shrink-0">
        <Link to="#none" className="lg:hidden">
          <img className="size-5" src="/assets/images/ico_search.png" />
        </Link>
        {token ? (
          <MenuAccount />
        ) : (
          <Link to="/login">
            <img className="size-5" src="/assets/images/ico_user.png" />
          </Link>
        )}
        <Link to="/wish-list" className="relative">
          <span className="absolute -top-2 -right-[10px] text-white flex justify-center items-center text-xs size-[18px] bg-black rounded-full">
            {wishList.length}
          </span>
          <img className="size-5" src="/assets/images/ico_heart.png" />
        </Link>
        <Link to="/cart-page" className="relative">
          <span className="absolute -top-2 -right-[10px] text-white flex justify-center items-center text-xs size-[18px] bg-black rounded-full">
            {countQuantity}
          </span>
          <img className="size-5" src="/assets/images/ico_bag.png" />
        </Link>
      </div>
    </>
  );
}

export default HeaderProfile;
