import { Link } from "react-router-dom";

function BannerProductList() {
  return (
    <>
      <section className="relative">
        <img src="./assets/images/img_product_list_banner.webp" />
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <h1 className="text-4xl font-semibold">Products</h1>
          <ul className="flex items-center justify-center gap-3 mt-2">
            <li>
              <Link to="/">Home /</Link>
            </li>
            <li>
              <Link to="/product">Products</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default BannerProductList;
