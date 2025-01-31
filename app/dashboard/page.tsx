'use client'
import { useEffect, useState } from "react";


interface Blog {
  id: number;
  title: string;
  content: string;
  author: string
  date: Date
  category: string
}


const DashBoardPage: React.FC = () => {
  const [blogs , setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api");
        const posts = await data.json();
        setBlogs(posts);
      } catch (err) {
        alert('Error', err);
      }
    };
    fetchData();
  }, [])

  return (
    <div>
      <h1>Blogs </h1>

      <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>{blog.content}</li>

      ))}
    </ul>
    </div>
  );
}

export default DashBoardPage;