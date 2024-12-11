// app/blog/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string; // Base64 string
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        toast.error(err as string);
      }
    };

    fetchPosts();
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit new post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          imageUrl: newPost.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const createdPost: Post = await response.json();
      setPosts((prev) => [...prev, createdPost]);
      setNewPost({ title: "", content: "", image: "" });
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <div className="p-4">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts List */}
      <section className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          New Post
        </button>
      </section>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border border-gray-300 rounded">
            <section className="flex justify-between">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Creado: {new Date(post.createdAt).toLocaleString()}
              </p>
            </section>
            {post.imageUrl && (
              <Image
                width={200}
                height={200}
                src={post.imageUrl}
                alt={post.title}
                className="mt-2 max-w-full w-full h-full"
              />
            )}
            <p className="text-gray-700 mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
