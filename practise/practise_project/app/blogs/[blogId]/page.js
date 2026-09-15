import React from 'react'

export default async function Blog({ params }) {
  const { blogId } = await params;
  return <div>Blog {blogId}</div>;
}
