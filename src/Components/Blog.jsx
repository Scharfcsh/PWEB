import React from 'react';

import { publications } from '../constants/projects.js';

const Blog = () => {
  return (
    <div className="min-h-screen bg-transparent text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">Latest Publications</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {publications.map((post) => (
          <div
            key={post.id}
            className="border border-gray-500 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-teal-400 mb-2">{post.title}</h2>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.readTime}</span>
                <a className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded" href={post.readMore}>
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;