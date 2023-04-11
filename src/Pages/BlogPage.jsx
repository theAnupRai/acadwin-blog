import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Spinner from "../components/Spinner";
import BlogDetails from "../components/BlogDetails";
import Header from "../components/Header";
// import {baseUrl} from '../baseUrl'

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blogs, setBlogs] = useState(null);
  const [relatedblogs, setRelatedblogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setBlogs(data.blogs);
      setRelatedblogs(data.relatedblogs);
    } catch {
      console.log("Error inside blogID call");
      setBlogs(null);
      setRelatedblogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      {loading ? (
        <div>
          {" "}
          <Spinner />{" "}
        </div>
      ) : blogs ? (
        <div>
          <BlogDetails post={blogs} />
          <h2>Relates Blogs</h2>
          {relatedblogs.map((post) => (
            <div key={post.id}>
              <BlogDetails post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No Blog Found</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
