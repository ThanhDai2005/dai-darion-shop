function Shipping() {
  return (
    <>
      <section className="bg-[#EBEBE9]">
        <div className="container">
          <ul className="grid items-center grid-cols-2 gap-5 lg:grid-cols-4 py-14">
            <li className="flex items-center gap-4 lg:justify-center">
              <img src="/assets/images/ico_freeship.svg" />
              <span className="text-sm font-semibold lg:text-base">
                Free Shipping Over $50
              </span>
            </li>
            <li className="flex items-center gap-4 lg:justify-center">
              <img src="/assets/images/ico_quality.svg" />
              <span className="text-sm font-semibold lg:text-base">
                Quality Assurance
              </span>
            </li>
            <li className="flex items-center gap-4 lg:justify-center">
              <img src="/assets/images/ico_return.svg" />
              <span className="text-sm font-semibold lg:text-base">
                Return within 14 days
              </span>
            </li>
            <li className="flex items-center gap-4 lg:justify-center">
              <img src="/assets/images/ico_support.svg" />
              <span className="text-sm font-semibold lg:text-base">
                Support 24/7
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Shipping;
