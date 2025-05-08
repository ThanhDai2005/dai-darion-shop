import { Link } from "react-router-dom";

function BannerMain() {
  return (
    <>
      <section className="mt-20 mb-9 lg:mb-20 bg-[#EBEBE9]">
        <div className="container py-20 ">
          <div className="items-center justify-between lg:flex">
            <div>
              <p className="text-sm">EXPERIENCE THE BEST</p>
              <h3 className="my-10 text-3xl font-semibold leading-[1.4]">
                Tailored Comfort:
                <br />
                Customized Interior
                <br />
                Styling
              </h3>
              <Link
                to="#none"
                className="inline-flex items-center justify-center font-semibold border border-black rounded-full px-7 h-9 text-[15px] hover:text-white hover:bg-black duration-300"
              >
                View All
              </Link>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl lg:mt-0">
              <img
                className="image"
                src="./assets/images/img_experience.webp"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerMain;
