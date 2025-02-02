import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient({});

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if(!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isValid = bcryptjs.compare(password, user.password);

    if(!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const tokenData = {
      id: user.id,
      email: user.email,
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '1d'});
    const response = NextResponse.json({ 
      message : 'User logged in successfully',
      token,
      UserId : user.id,
    });
    
    response.cookies.set('token',token , {httpOnly: true});

    return response;
  }
  catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}