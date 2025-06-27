// import mongoose, { Schema } from "mongoose";

// Define the TypeScript interface for a Post
// This interface describes the structure of a Post object
export type Post = {
  id: string;
  title: string;
  image: string;
  content: string;
};

// Define the schema for the Post model
// This schema defines the structure of the Post documents in the MongoDB collection
// const postSchema = new Schema({
//     title: { type: String, required: true },
//     image: { type: String, required: true },
//     content: { type: String, required: true },
// },
// {
//     timestamps: true,}
// )

// This will create a Post model if it doesn't already exist
// If it does exist, it will use the existing model
// const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
// export default Post;