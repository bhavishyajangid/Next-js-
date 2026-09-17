import React from 'react'

// showing the blod id in the title using the metadata api 
export async function generateMetadata({ params }) {
  const { blogId } = await params;
  console.log(blogId)
  return {
    title: `Blog ${blogId}`,
  };
}


export default async function Blog({ params }) {
  const { blogId } = await params;
  return <div>Blog {blogId}</div>;
}
