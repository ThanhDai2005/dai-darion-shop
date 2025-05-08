import { Grow, Pagination, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogPage() {
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchAPI = async () => {
    const limit = 10;
    const res = await axios(
      `https://apiforlearning.zendvn.com/public/api/v2/categories_news/2/articles?limit=${limit}&page=${page}`
    );
    setBlog(res.data.data);
    setTotalPage(Math.ceil(res.data.meta.total / limit));
  };

  useEffect(() => {
    fetchAPI();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {blog.length > 0 && (
        <Grow in={blog} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <section className="pb-12">
            <div className="container">
              <ul className="flex items-center gap-2 py-4">
                <li>
                  <Link className="text-sm" to="/">
                    <i className="icon fa fa-home"></i> /
                  </Link>
                </li>
                <li>
                  <span className="text-sm">Blog</span>
                </li>
              </ul>

              <div className="grid-cols-5 lg:grid">
                <div className="col-span-1 p-0 lg:p-4">
                  <h3 className="text-lg font-semibold underline">
                    Tin tức mới nhất
                  </h3>
                  <ul className="space-y-3">
                    {blog.slice(4, 10).map((item) => (
                      <li key={item.id}>
                        <Link to={`/blog/${item.id}`} className="flex">
                          <div className="overflow-hidden rounded-xl">
                            <img
                              className="block object-cover img-blog size-full"
                              src={item.thumb}
                            />
                          </div>
                          <h2 className="mt-2 title_blog">{item.title}</h2>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-4 ">
                  <ul className="grid-cols-3 gap-5 space-y-3 lg:grid mt-9 lg:space-y-0">
                    {blog.slice(0, 9).map((item) => (
                      <li key={item.id} className="relative">
                        <Link to={`/blog/${item.id}`}>
                          <div className="overflow-hidden rounded-xl">
                            <img
                              className="object-cover image"
                              src={item.thumb}
                            />
                          </div>
                          <h3 className="mt-2 text-xl font-semibold">
                            {item.title}
                          </h3>
                          <p className="blog_title_span">{item.description}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Pagination
                    className="flex justify-center items-center mt-[30px]"
                    page={page}
                    count={totalPage}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          </section>
        </Grow>
      )}
    </>
  );
}

export default BlogPage;
