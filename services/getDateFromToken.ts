import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface DecodedData {
  id: string,
  email: string,
  name: string,
  password: string,
  posts : string[],
  comments: string[],
  followers: string[],
  following: string[],
  upvotes: string[],
  createdAt: string,
  updatedAt: string,
}

export function getDateFromToken(request: NextRequest) {
  try{
    const token = request.cookies.get('token')?.value || '';
    const DecodedDataUser : DecodedData = jwt.verify(token, process.env.JWT_SECRET!) as DecodedData;

    const id  : string = DecodedDataUser.id;
    return id;
  } catch(err : any){
    return '';
  }
}


