import axios from "axios";

const URL_CATE = "https://dummyjson.com/products/categories";
const API_LIST_PRODUCT = "https://dummyjson.com/products";
const API_GET_PRODUCT_BY_CATEGORY = "https://dummyjson.com/products/category";
const API_REGISTER = "https://apiforlearning.zendvn.com/api/v2/users/register";
const API_LOGIN = "https://apiforlearning.zendvn.com/api/v2/auth/login";
const API_GET_ME = "https://apiforlearning.zendvn.com/api/v2/auth/me";
const API_PROFILE = "https://apiforlearning.zendvn.com/api/v2/auth/update";
const API_CHANGE_PASSWORD =
  "https://apiforlearning.zendvn.com/api/v2/auth/change-password";
const ApiServices = {
  ListCategories: async () => {
    return await axios(URL_CATE);
  },

  ListProduct: async () => {
    return await axios(API_LIST_PRODUCT);
  },

  DetailProduct: async (id) => {
    return await axios(`${API_LIST_PRODUCT}/${id}`);
  },

  SimilarProduct: async (category) => {
    return await axios(`${API_GET_PRODUCT_BY_CATEGORY}/${category}`);
  },

  register: async (data) => {
    return await axios.post(API_REGISTER, data);
  },

  login: async (data) => {
    return await axios.post(API_LOGIN, data);
  },

  getInfo: async () => {
    const token = localStorage.getItem("token");
    return await axios(API_GET_ME, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateProfile: async (data) => {
    const token = localStorage.getItem("token");
    return await axios.put(API_PROFILE, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  changePassword: async (data) => {
    const token = localStorage.getItem("token");
    return await axios.put(API_CHANGE_PASSWORD, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default ApiServices;
