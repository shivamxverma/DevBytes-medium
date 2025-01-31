interface Request {
  method: string;
  headers: Headers;
  body?: any;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export async function GET(req: Request): Promise<Response> {
  const response = await fetch("https://api.vercel.app/blog", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }

  const data: BlogPost[] = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}