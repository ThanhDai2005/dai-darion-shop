import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductList/ProductPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import ContactPage from "../pages/ContactPage";
import WishListPage from "../pages/WishListPage";
import LoginPage from "../pages/LoginPage";
import PrivateRouter from "../components/PrivateRouter";
import CartPage from "../pages/CartPage";
import CategoryPage from "../pages/CategoryPage";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import SearchPage from "../pages/SearchPage";
import RegisterPage from "../pages/RegisterPage";
import LogOutPage from "../pages/LogoutPage";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import BlogDetail from "../pages/BlogPage/BlogDetail";
import NotFoundPage from "../pages/NotFoudPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/product/:id",
        element: <DetailProduct />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/wish-list",
        element: <WishListPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/not-found",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <Navigate to="/not-found" />,
      },
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "/cart-page",
            element: <CartPage />,
          },
          {
            path: "/order",
            element: <OrderPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/change-password",
            element: <ChangePasswordPage />,
          },
          {
            path: "/logout",
            element: <LogOutPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
