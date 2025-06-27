"use client";

import Link from "next/link";
import PostCard from "../components/postCard";
import { useEffect, useState } from "react";
import { Post } from "../../models/post";

export default function Home() {
  const [postList, setPostList] = useState<Post[]>([]);
  // console.log("Fetched Posts:", postList);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      // Normalize _id to string if it's an object
      const normalized = data.map((item: any) => ({
        ...item,
        _id:
          typeof item._id === "object" && item._id !== null && "$oid" in item._id
            ? item._id.$oid
            : item._id,
      }));

      setPostList(normalized);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto my-3">
      <h1>Next Js Crud + MongoDB</h1>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded">
        <Link href="/create">Create Post</Link>
      </button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postList && postList.length > 0 ? (
          postList.map((val) => {
            // console.log("Passing to PostCard:", val);
            return (
              <PostCard
                key={val.id}
                id={val.id}
                title={val.title}
                image={val.image}
                content={val.content}
              />
            );
          })
        ) : (
          <p className="bg-gray-300 p-3 my-3">You don't have any post yet</p>
        )}
      </div>
    </div>
  );
}
