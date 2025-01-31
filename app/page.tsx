import Image from "next/image";
import {useState} from "react";

export default function Home() {
  const [blogs , setblogs] = useState<string[]>([]);

  
  return (
    <div>
      <h1>Hello i am in home page</h1>
      <div><button>Add Blog</button></div>
      
    </div>
  );
}
