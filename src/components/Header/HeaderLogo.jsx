import { Link } from "react-router-dom";

function HeaderLogo() {
  return (
    <>
      <h1 className="mr-5">
        <Link to="/" className="w-[130px] block">
          <img
            className="max-w-full"
            src="/assets/images/logo.webp"
            alt="darion"
          />
        </Link>
      </h1>
    </>
  );
}

export default HeaderLogo;
