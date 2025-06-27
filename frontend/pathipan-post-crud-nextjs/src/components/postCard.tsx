"use client";

import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./deleteBtn";

interface PostCardProps {
  id: string; // { $oid: string } | string
  title: string;
  image: string;
  content: string;
}

// BUG: id is not assigned in the PostCardProps interface, but it is used in the DeleteBtn component
const PostCard = ({ id, title, image, content }: PostCardProps) => {
//   console.log("PostCard Props:", { id, title, image, content });
  return (
    <div className="bg-orange-50 shadow-xl my-10 p-10 rounded-xl">
      <h4>{title}</h4>
      <Image src={image} width={300} height={0} alt={title} priority />
      <p>{content}</p>
      <div className="my-5">
        <Link
          className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg"
          href={`/edit/${id}`}
        >
          Edit
        </Link>
        <DeleteBtn id={id} />
      </div>
    </div>
  );
};

export default PostCard;
