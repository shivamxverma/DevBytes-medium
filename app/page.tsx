'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Blog {
  title: string;
  content: string;
}

export default function Home() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [prompt, setPrompt] = useState<string>('');

  const HandleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/logout');
      localStorage.removeItem('UserId');
      router.push('/signin');
    } catch (err: any) {
      alert(err);
    }
  };

  const ViewBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/blogs', {
        params: { userId: localStorage.getItem('UserId') },
      });
      setBlogs(res.data.blogs);
    } catch (err: any) {
      alert(err);
    }
  };

  const GenerateBlog = async () => {
    try {
      const id = localStorage.getItem('UserId');
      const res = await axios.post('http://localhost:3000/api/generate-blog', {
        prompt: `Write a blog post about ${prompt} in less than 300 words. Use simple, structured paragraphs and avoid unnecessary details.`,
        userId: id,
      });
      
      console.log(res.data);
      setBlogs([...blogs, res.data.blog]);
    } catch (err: any) {
      alert(err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">Home Page</h1>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={HandleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
          <button 
            onClick={() => router.push('/add-blog')} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add Blog
          </button>
          <button 
            onClick={ViewBlogs} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            View Blogs
          </button>
        </div>

        {/* Input for Prompt */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input 
            type="text" 
            placeholder="Give a prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={GenerateBlog} 
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
            Generate Blog
          </button>
        </div>

        {/* Blogs Section */}
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-gray-50 p-4 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
