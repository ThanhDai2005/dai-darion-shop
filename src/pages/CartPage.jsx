import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_TO_CART,
  REDUCE_QUANTITY,
  UPDATE_TO_CART,
} from "../actions/cart";
import { Link } from "react-router-dom";

function CartPage() {
  const cart = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.info.price * item.quantity,
    0
  );

  const handleReduce = (id, quantity) => {
    if (quantity > 1) {
      dispatch(REDUCE_QUANTITY(id));
    } else {
      dispatch(DELETE_TO_CART(id));
    }
  };

  const handleIncrease = (id) => {
    dispatch(UPDATE_TO_CART(id));
  };

  const handleDelete = (id) => {
    dispatch(DELETE_TO_CART(id));
  };

  return (
    <>
      {cart.length > 0 ? (
        <section className="pt-20 pb-12">
          <div className="container">
            <h1 className="text-3xl font-semibold text-center">
              Shopping Cart
            </h1>

            <div className="grid-cols-6 gap-8 mt-10 lg:grid">
              <div className="col-span-4">
                <table className="rounded-lg">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="flex items-center w-1/2 gap-3 p-5">
                            <div className="w-32 overflow-hidden">
                              <img
                                className="image"
                                src={item.info.thumbnail}
                              />
                            </div>
                            <div>
                              <p className="text-xs uppercase">
                                {item.info.title}
                              </p>
                              <span className="text-xs">$8.99</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-center w-full border border-black">
                            <button
                              onClick={() =>
                                handleReduce(item.id, item.quantity)
                              }
                              className="w-full p-3 text-left "
                            >
                              -
                            </button>
                            <div>{item.quantity}</div>
                            <button
                              onClick={() => handleIncrease(item.id)}
                              className="w-full p-3 text-right"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="text-center">
                            ${item.info.price * item.quantity}
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="text-center"
                          >
                            <img
                              className="block size-5"
                              src="../assets/images/ico_trash.png"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-9">
                  <div>Special instructions for seller</div>
                  <textarea
                    className="w-full p-5 mt-3 border border-gray"
                    placeholder="how can we help you?"
                    rows={5}
                  ></textarea>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-[#f7f4ef] p-7 rounded-lg">
                  <div className="text-sm font-medium">
                    FREE SHIPPING ON ORDERS $100.00
                  </div>
                  <div className="mt-2 text-sm">
                    Congratulations , you've got free shipping!
                  </div>
                  <div className="mt-5 h-1 bg-[#14c100] w-full"></div>
                </div>
                <div className="mt-4 p-6 bg-[#f6f6f6]">
                  <div>Coupon</div>
                  <div className="mt-2 mb-6 text-[#8a8a8a]">
                    * Discount will be calculated and applied at checkout
                  </div>
                  <div>
                    <input
                      className="px-6 w-full h-[40px] bg-white rounded-lg text-sm border border-gray"
                      placeholder="Coupon code"
                    />
                  </div>
                  <div className="mt-6 font-semibold">Total: ${totalPrice}</div>
                  <Link
                    to="/order"
                    className="w-full flex justify-center items-center px-4 mt-6 h-[50px] text-sm font-semibold text-white bg-black border rounded-full hover:border-black hover:bg-white hover:text-black transition-all"
                  >
                    Check out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-5 text-center">
          <h1 className="mb-4 text-xl font-semibold">
            Bạn chưa chọn sản phẩm.
          </h1>
          <div className="flex items-center justify-center mb-4">
            <img
              alt="Sad shopping bag with a tear drop"
              className="w-[500px] h-[350px]"
              src="../assets/images/cart.png"
            />
          </div>
          <p className="mb-5">Hãy nhanh tay chọn ngay sản phẩm yêu thích.</p>
          <Link
            to="/product"
            className="inline-block py-[10px] px-[20px] my-5 text-white bg-black -mt-[50px]"
          >
            Buy Now
          </Link>
        </section>
      )}
    </>
  );
}

export default CartPage;
