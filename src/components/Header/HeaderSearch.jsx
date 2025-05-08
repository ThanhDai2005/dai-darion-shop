import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderSearch() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target[0].value == "") {
      e.preventDefault();
    } else {
      navigate(`/search?q=${e.target[0].value}`);
    }
  };

  return (
    <>
      <form
        className="relative ml-auto w-[500px] lg:mr-20 xl:block hidden"
        onSubmit={handleSearch}
      >
        <input
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 text-gray-700 bg-white border border-black rounded-full "
          type="text"
        />
        <button className="absolute -translate-y-1/2 left-3 top-1/2">
          <img className="w-5 h-5" src="/assets/images/ico_search.png" />
        </button>
      </form>
    </>
  );
}

export default HeaderSearch;
