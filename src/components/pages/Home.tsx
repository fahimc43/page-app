import React, { useEffect, useState } from "react";

interface InitPost {
  title: string;
  url: string;
  created_at: Date;
  author: string;
}

const Home: React.FC = () => {
  const [post, setPost] = useState<InitPost[]>([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const res = await fetch(
        "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1"
      );
      const data = await res.json();
      setPost(data.hits);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>This is home page {post.length}</h1>
    </div>
  );
};

export default Home;
