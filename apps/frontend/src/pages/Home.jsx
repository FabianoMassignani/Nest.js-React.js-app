import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { getPokemon } from "../store/actions/pokemon";

// const [posts, setPosts] = useState([]);
// const [count, setCount] = useState(4);
// const [currentCount, setCurrentCount] = useState(null);
// const [total, setTotal] = useState(null);

const fetchPosts = async () => {
  // const data = await fetchAllPosts(count);
  // setPosts(data?.data?.data);
  // setCurrentCount(data?.data?.currentLength);
  // setTotal(data?.data?.total);
  getPokemon();
  console.log("fetchPosts");
};

export const Home = () => {
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar
        children={
          <div>
            <h1>Home</h1>
          </div>
        }
      />
    </div>
  );
};
