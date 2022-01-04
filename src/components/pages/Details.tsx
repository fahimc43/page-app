import React from "react";
import { useLocation } from "react-router";
import { InitPost } from "./Home";

const Details: React.FC = () => {
  const { state } = useLocation();

  const post = state as InitPost;
  return (
    <div>
      <h1>This is Details page</h1>
      <pre>{JSON.stringify(post, null, 1)}</pre>
    </div>
  );
};

export default Details;
