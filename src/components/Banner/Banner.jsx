import { Link } from "react-router-dom";

function Banner() {
  return (
    <>
      <section className="relative">
        <img className="animate-zoomIn" src="/assets/images/img_banner.jpg" />
        <div className="absolute w-full text-center text-white -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <h1 className="text-xl font-bold lg:text-4xl animate-slideInLeft">
            Harmony in Design:
            <br></br>
            Blending Form and Function
          </h1>
          <Link
            to="#none"
            className="mt-4 lg:mt-8 border inline-flex h-9 border-white rounded-full px-7 text-[15px] items-center font-semibold hover:bg-white hover:text-black transition-all duration-300 animate-slideInLeft "
          >
            Shop now
          </Link>
        </div>
      </section>
    </>
  );
}

export default Banner;
