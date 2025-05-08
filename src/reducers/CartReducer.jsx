const initialState = JSON.parse(localStorage.getItem("cartStorage")) || [];

const CartReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case "ADD_TO_CART":
      newState = [
        ...state,
        {
          id: action.id,
          info: action.info,
          quantity: 1,
        },
      ];
      break;

    case "UPDATE_TO_CART":
      newState = newState.map((item) => {
        if (item.id == action.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      break;

    case "REDUCE_QUANTITY":
      newState = newState.map((item) => {
        if (item.id == action.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      break;

    case "DELETE_TO_CART":
      newState = newState.filter((item) => item.id != action.id);
      break;
    case "DELETE_ALL":
      newState = [];
      break;
    default:
      return state;
  }
  localStorage.setItem("cartStorage", JSON.stringify(newState));
  return newState;
};

export default CartReducer;
