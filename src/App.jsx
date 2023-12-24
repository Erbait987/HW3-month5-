import React from "react";
import { useEffect, useState } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/posts?limit=150`);
      setPosts(res.data.posts);
      setLoading(false);
    };
    getData();
  }, [currentPage, dataPerPage]);

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const currentData = posts.slice(firstDataIndex, lastDataIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container mt-5">
        <h1>Posts</h1>
        <Posts datas={currentData} loading={loading} />
        <Pagination
          dataPerPage={dataPerPage}
          totalPost={posts.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default App;
