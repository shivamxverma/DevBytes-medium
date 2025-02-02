'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddBlog() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('UserId');
    console.log(userId);

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/blogs", {
        title,
        content,
        userId,
      });
      alert("Blog added successfully!");
      router.push("/"); 
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog");
    }
  };

  return (
    <div>
      <h1>Add a Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
