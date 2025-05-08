export const ADD_TO_WISHLIST = (id, info) => {
  return {
    type: "ADD_TO_WISHLIST",
    id: id,
    info: info,
  };
};

export const DELETE_TO_WISHLIST = (id) => {
  return {
    type: "DELETE_TO_WISHLIST",
    id: id,
  };
};
