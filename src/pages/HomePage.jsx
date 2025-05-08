import Banner from "../components/Banner/Banner";
import BannerMain from "../components/Banner/BannerMain";
import BestSeller from "../components/Bestseller";
import NewArrivalsProduct from "../components/NewArrivalsProduct";
import OurCategories from "../components/OurCategories";
import Shipping from "../components/Shipping";

function HomePage() {
  return (
    <>
      <div className="main_home">
        <Banner />
        <Shipping />
        <OurCategories />
        <BestSeller />
        <BannerMain />
        <NewArrivalsProduct />
      </div>
    </>
  );
}

export default HomePage;
