function Footer() {
  return (
    <>
      <footer className="bg-white">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-24 ">
            <div>
              <h3 className="mb-4 text-lg font-bold">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Our Shops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Artists
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Local Giving
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:flex md:flex-col md:col-span-2 md:justify-center">
              <h3 className="mb-4 text-xl font-semibold lg:text-center">
                Sign Up For Our Newsletter To Receive Notifications And Other
                Promotions
              </h3>
              <div className="flex mt-4">
                <input
                  type="email"
                  className="w-full p-4 border border-black rounded-l-full focus:outline-none "
                  placeholder="Email address..."
                />
                <button className="px-6 py-2 text-white bg-black rounded-r-full">
                  Subscribe
                </button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Customer Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Store Locator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shipping Information
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Wholesale
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-sm text-center">
              Copyright © 2024. All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
