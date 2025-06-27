import { connectDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    const post = await Post.findOne({ _id: id });

    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { title, image, content } = await request.json();

    if (!title || !image || !content) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    const post = await Post.findByIdAndUpdate(id, { title, image, content }, { new: true });

    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post updated successfully", post }, { status: 200 });
}