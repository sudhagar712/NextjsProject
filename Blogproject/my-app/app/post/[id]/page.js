"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Post({ params }) {
  const [postDetails, setPostDetails] = useState(null);
  const { id } = params; 

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch post details");
        }
        return res.json();
      })
      .then((data) => setPostDetails(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!postDetails) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <h1 className="font-bold text-3xl">{postDetails.title}</h1>
      <p className="text-gray-400">Published on  {postDetails.createdAt}</p>
      <div>
       <img src={postDetails.image} className="w-[500px] h-[500px]" />
      </div>
      <p>{postDetails.description}</p>
    </>
  );
}
