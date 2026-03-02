import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Aayush Joshi</h1>
        <p className="text-muted-foreground text-lg max-w-md mb-6">
          Developer passionate about building great web
          experiences.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/blog">Read Blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/comments">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Me
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-muted-foreground">
          As a professional web developer, I specialize in React and Next.js, with extensive experience building responsive,
          high-performance applications. My core expertise includes advanced use of React hooks, Redux for state management,
          React Native, and modern back-end technologies such as Node.js, Express, and MongoDB. I collaborate effectively within
          cross-functional teams and am highly motivated to design intuitive, visually compelling user interfaces. A proactive
          problem-solver with strong communication skills, I consistently stay aligned with evolving industry trends and deliver
          scalable, reliable, and practical solutions.
        </p>
      </section>

      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:bg-accent transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
        <Button variant="link" asChild className="mt-4 px-0">
          <Link href="/blog">
            View all posts <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
