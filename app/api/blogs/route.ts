import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Blog {
  title: string;
  content: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, userId }: Blog = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newBlog = await prisma.post.create({
      data: {
        title,
        content,
        published : true,
        authorId: parseInt(userId),
      },
    });

    return NextResponse.json(
      { message: "Blog saved successfully!", blog: newBlog },
      { status: 201 }
    );
  } catch (error : any) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ message: "Error saving blog" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId') || '0';
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const blogs = await prisma.post.findMany({
      where: {
        published: true,
        authorId: parseInt(userId.toString()),
      },
      select: {
        id: true,
        title: true,
        content: true,
      }
    });
    return NextResponse.json({ blogs }, { status: 200});
  } catch (error : any) {
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 });
  }
}
