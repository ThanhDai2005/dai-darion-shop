import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="four_zero_four_bg">
            <h1 className="text-center text-[80px]">404</h1>
          </div>
          <div className="text-center -mt-[50px]">
            <h3>Look like you're lost</h3>
            <p>the page you are looking for not avaible!</p>
            <Link
              to="/"
              className="inline-block my-5 py-[10px] px-[20px] bg-black text-white"
            >
              Go to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
