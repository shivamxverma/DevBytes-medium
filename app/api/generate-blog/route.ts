import { NextRequest } from "next/server";
import { generateContent } from "../../../utils/AiModel";
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { prompt , userId } = await req.json();
  const Content = await generateContent(prompt);

  const data = await Prisma.post.create({
    data: {
      title: prompt,
      content: Content,
      published: true,
      authorId: userId,
    },
  })

  return {
    status: 200,
    data: { 
      blog: data, 
    },
  };

}