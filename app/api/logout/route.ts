import { NextResponse } from "next/server";

export async function GET(){
  try{
    const response = NextResponse.json({ message: 'User logged out successfully' });
    response.cookies.set('token', '', {httpOnly: true, expires : new Date(0)});
    return response;
  } catch(err){
    return NextResponse.json({ error: (err as Error).message });
  }
}