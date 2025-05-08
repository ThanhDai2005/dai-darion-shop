import { useSelector } from "react-redux";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderProfile from "./HeaderProfile";
import HeaderSearch from "./HeaderSearch";
import { useNavigate } from "react-router-dom";

function Header() {
  const isLogin = useSelector((state) => state.LoginReducer);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-10 py-5 bg-white shadow-lg lg:py-8">
        <div className="container flex items-center ">
          <HeaderLogo />
          <HeaderSearch />
          <HeaderMenu />
          <HeaderProfile />
        </div>
      </header>
    </>
  );
}

export default Header;
