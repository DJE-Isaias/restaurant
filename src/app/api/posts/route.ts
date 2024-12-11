import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Obtener todos los posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts: " + error },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo post
export async function POST(req: Request) {
  try {
    const { title, content, imageUrl } = await req.json();

    // Validar campos requeridos
    if (!title || !content || !imageUrl) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Crear el post en la base de datos
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post: " + error },
      { status: 500 }
    );
  }
}
