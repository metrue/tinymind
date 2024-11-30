"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/githubApi";
import Link from "next/link";
import Image from 'next/image';

const BlogCard = ({ post, username }: { post: BlogPost; username: string }) => (
  <div
    role="listitem"
    className={`tile-item nr-scroll-animation bg-light rounded-lg border-lightgrey`}

          style={{
            backgroundImage: `url(${post.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'auto',
            minHeight: '200px',
    borderWidth: '0.5px',
    borderColor: 'lightgrey',
    padding: '16px',
          }}
  >
    <Link
      href={`/${username}/blog/${encodeURIComponent(post.id)}`}
      className={`tile large-load medium-load small-loads`}
      aria-label={post.title}
    >
      {/* Media Section */}
      <div className="tile__media" aria-hidden="true">
      <div className="tile__description" aria-hidden="true" style={{color: 'black', fontWeight: 'bold', fontSize: '2em'}}>
        {/* Headline */}
        <div className="tile__head">
          <div className="tile__headline">{post.title}</div>
        </div>

        {/* Timestamp */}
        <div className="tile__timestamp icon-hide icon icon-before icon-clock">
          {formatDate(post.date)}
        </div>
      </div>
        </div>

      {/* Description Section */}
    </Link>
  </div>
);

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
}

export default function PublicBlogList({
  posts,
  username,
}: {
  posts: BlogPost[];
  username: string;
}) {
  // const [sortedPosts, setSortedPosts] = useState<BlogPost[]>([]);

  // useEffect(() => {
  //   const sorted = [...posts].sort(
  //     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  //   );
  //   setSortedPosts(sorted);
  // }, [posts]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
        {[
          { id: 'a', title: 'Hello World', content: 'aaa', date: new Date().toString(), imageUrl: 'https://github.com/metrue/picx-images-hosting/raw/master/IMG_2285.77dg8ua2cl.jpg'},
          { id: 'a', title: 'Hello World', content: 'aaa', date: new Date().toString(), imageUrl: 'https://l.ruby-china.com/photo/2020/9bb10c7a-169e-4733-8c88-1d26bb1faf29.png'}].map((post) => (
            <BlogCard key={post.id} post={post} username={username} />
        ))}
        </div>
        <div className="flex flex-col gap-2">
        {[{ id: 'a', title: 'Hello World', content: 'aaa', date: new Date().toString(),imageUrl: 'https://l.ruby-china.com/photo/2020/9bb10c7a-169e-4733-8c88-1d26bb1faf29.png' },
          { id: 'a', title: 'Hello World', content: 'aaa', date: new Date().toString(), imageUrl: 'https://l.ruby-china.com/photo/2020/9bb10c7a-169e-4733-8c88-1d26bb1faf29.png'}, 
          { id: 'a', title: 'Hello World', content: 'aaa', date: new Date().toString(), imageUrl: 'https://l.ruby-china.com/photo/2020/9bb10c7a-169e-4733-8c88-1d26bb1faf29.png'}].map((post) => (
            <BlogCard key={post.id} post={post} username={username} />
        ))}
        </div>
      </div>
    </div>
  );
}
