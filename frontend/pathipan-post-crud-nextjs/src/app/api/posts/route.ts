import { connectDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { title, image, content } = await request.json();
    console.log("Received data:", { title, image, content });

    if (!title || !image || !content) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    await Post.create({
        title,
        image,
        content,
    });

    return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
}

export async function GET() {
    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    const posts = await Post.find({}).sort({ createdAt: -1 });

    return NextResponse.json(posts, { status: 200 });
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
}