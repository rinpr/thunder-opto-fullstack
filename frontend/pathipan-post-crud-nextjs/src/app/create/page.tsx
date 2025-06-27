"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !image || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, image, content }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Create Post</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
      >
        Go Back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Post Title"
        />
        <input
          onChange={(e) => setImage(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Post IMG URL"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name=""
          id=""
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter your content"
        ></textarea>
        <button
          style={{ cursor: "pointer" }}
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
