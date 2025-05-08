import { useEffect } from "react";
import { useState } from "react";
import ApiServices from "../../service/ApiServices";
import { avatarFake } from "../../helper/constant";
import { Link } from "react-router-dom";

function OurCategories() {
  const [ListCategory, setListCategory] = useState([]);

  const fetchListCategories = async () => {
    const res = await ApiServices.ListCategories();
    setListCategory(res.data);
  };
  useEffect(() => {
    fetchListCategories();
  }, []);

  console.log(ListCategory);

  return (
    <>
      <section className="mt-24">
        <div className="container">
          <h1 className="text-3xl font-bold text-center">Our Categories</h1>
          <ul className="grid-cols-4 gap-10 md:grid mt-11">
            {ListCategory.slice(7, 11).map((data, index) => (
              <li key={index} className="mt-6 md:mt-0">
                <Link to={`/category/${data.slug}`}>
                  <div className="overflow-hidden rounded-lg">
                    <img className="image" src={avatarFake[index]} />
                  </div>
                  <h3 className="mt-4 font-semibold">{data.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default OurCategories;
