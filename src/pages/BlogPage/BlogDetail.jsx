import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BlogDetail() {
  const params = useParams();

  const [BlogDetail, setBlogDetail] = useState({});
  const [BlogRelated, setBlogRelated] = useState([]);

  const loadBlogDetail = async () => {
    const res = await axios(
      `https://apiforlearning.zendvn.com/api/v2/articles/${params.id}`
    );
    setBlogDetail(res.data.data);
  };

  const loadBlogRelated = async () => {
    const res = await axios(
      `https://apiforlearning.zendvn.com/public/api/v2/categories_news/2/articles`
    );
    setBlogRelated(res.data.data);
  };

  useEffect(() => {
    if (params.id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    loadBlogDetail();
    loadBlogRelated();
  }, [params.id]);

  // Loại bỏ thẻ <p> và </p>
  const cleanContent =
    typeof BlogDetail.content === "string"
      ? BlogDetail.content.replace(/<\/?p>/g, "")
      : "";

  const formatTimeAgo = (publishDate) => {
    const publish = new Date(publishDate);
    const now = new Date();

    // Tính số tháng chênh lệch
    const yearsDiff = now.getFullYear() - publish.getFullYear();
    const monthsDiff = now.getMonth() - publish.getMonth();
    let totalMonths = yearsDiff * 12 + monthsDiff;

    // Điều chỉnh nếu ngày hiện tại nhỏ hơn ngày publish
    if (now.getDate() < publish.getDate()) {
      totalMonths -= 1;
    }

    // Chuyển sang định dạng năm nếu >= 12 tháng
    if (totalMonths >= 12) {
      const years = Math.floor(totalMonths / 12);
      return `${years} năm trước`;
    }

    return `${totalMonths} tháng trước`;
  };

  const timeAgo = formatTimeAgo(BlogDetail.publish_date);

  return (
    <>
      <section className="mt-10">
        <div className="container">
          <h1 className="mb-4 text-3xl font-bold text-center">
            {BlogDetail.title}
          </h1>
          <div className="mb-4 text-center">
            {timeAgo} | {BlogDetail.author}
          </div>
          <div>
            <img className="mb-4 size-full" src={BlogDetail.thumb} />
          </div>
          <p className="text-[15px] mb-4 leading-[35px]">{cleanContent}</p>
          <div className="flex justify-between mt-8">
            <div className="font-bold">
              <span>Tags:</span>
              <span className="px-3 py-1 font-semibold">#Fashion #Beauty</span>
            </div>
            <div className="font-bold">
              <span>Share this post:</span>
              <a href="#" className="p-2 ">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="p-2 ">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="p-2 ">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="#" className="p-2 ">
                <i className="fa fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="grid-cols-2 gap-8 mt-4 lg:grid">
            <form>
              <h3 className="mb-4 text-lg font-bold">Bình luận tại đây</h3>
              <div className="mb-4">
                <input
                  className="w-full p-2 border border-black"
                  placeholder="Tên của bạn..."
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border border-black"
                  placeholder="Nội dung bình luận..."
                />
              </div>
              <button type="submit" className="px-4 py-2 text-white bg-black">
                GỬI BÌNH LUẬN
              </button>
            </form>
            <div>
              <h3 className="mb-4 text-lg font-bold">BÀI VIẾT LIÊN QUAN?</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {BlogRelated.slice(4, 10).map((item) => (
                  <Link
                    to={`/blog/${item.id}`}
                    className="text-center"
                    key={item.id}
                  >
                    <img className="w-full" src={item.thumb} />
                    <div className="font-bold">{item.title}</div>
                    <p className="text-sm">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetail;
