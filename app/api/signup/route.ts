import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs';
// import { redirect } from 'next/dist/server/api-utils';

const prisma = new PrismaClient({});

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if(user){
      return NextResponse.json({ error: 'User already exists' });
    }

    const salt = await bcryptjs.genSalt (10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ user });
  }
  catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}