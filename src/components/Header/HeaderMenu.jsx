import { NavLink } from "react-router-dom";

function HeaderMenu() {
  const items = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Product",
      to: "/product",
    },
    {
      title: "Blog",
      to: "/blog",
    },
    {
      title: "Contact",
      to: "/contact",
    },
  ];

  return (
    <>
      <nav className="hidden ml-auto mr-28 lg:block ">
        <ul className="flex items-center gap-10 ">
          {items.map((item, index) => (
            <li
              key={index}
              className="relative after:absolute after:left-0 after:h-[1.5px] after:w-full after:bg-black after:bottom-[-2px] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100  "
            >
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={item.to}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default HeaderMenu;
