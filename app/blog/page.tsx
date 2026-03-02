"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:bg-accent transition-colors">
              <Link href={`/blog/${post.slug}`}>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts found.</p>
      )}
    </div>
  );
}