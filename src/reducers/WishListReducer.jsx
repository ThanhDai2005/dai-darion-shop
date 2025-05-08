const initialState = JSON.parse(localStorage.getItem("wishListStorage")) || [];

const wishListReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      newState = [
        ...state,
        {
          id: action.id,
          info: action.info,
        },
      ];
      break;
    case "DELETE_TO_WISHLIST":
      newState = newState.filter((item) => item.id != action.id);
      break;
    default:
      return state;
  }
  localStorage.setItem("wishListStorage", JSON.stringify(newState));
  return newState;
};

export default wishListReducer;
