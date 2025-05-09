export const ADD_TO_CART = (id, info) => {
  return {
    type: "ADD_TO_CART",
    id: id,
    info: info,
  };
};

export const UPDATE_TO_CART = (id, quantity = 1) => {
  return {
    type: "UPDATE_TO_CART",
    id: id,
    quantity: quantity,
  };
};

export const REDUCE_QUANTITY = (id, quantity = 1) => {
  return {
    type: "REDUCE_QUANTITY",
    id: id,
    quantity: quantity,
  };
};

export const DELETE_TO_CART = (id) => {
  return {
    type: "DELETE_TO_CART",
    id: id,
  };
};

export const DELETE_ALL = () => {
  return {
    type: "DELETE_ALL",
  };
};
