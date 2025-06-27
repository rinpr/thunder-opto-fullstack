"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);

    const [post, setPostData] = useState<{ title: string; image: string; content: string } | null>(null);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    const getPostById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
                method: "GET",
                cache: "no-store",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch post");
            }
            const data = await response.json();
            setPostData(data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }

    useEffect(() => {
        getPostById();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
                method: "PATCH",
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
            console.error("Error updating post:", error);
        }

    }

    return (
        <div className="container mx-auto py-10">
            <h3 className="text-3xl font-bold">Edit Post</h3>
            <hr className="my-3" />
            <Link href="/" className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2">Go Back</Link>
            <form onSubmit={handleSubmit}>
                <input
                    defaultValue={post?.title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2" />
                <input
                    defaultValue={post?.image || ""}
                    onChange={(e) => setImage(e.target.value)}
                    type="text"
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2" />
                <textarea
                    defaultValue={post?.content || ""}
                    onChange={(e) => setContent(e.target.value)}
                    name=""
                    id=""
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2">
                </textarea>
                <button style={{ cursor: "pointer" }} type='submit' className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">Edit Post</button>
            </form>
        </div>
    );
}