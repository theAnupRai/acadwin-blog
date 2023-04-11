import React from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react';
import Spinner from './Spinner'
import BlogDetails from './BlogDetails';

const Blog = () => {
  const {loading, posts} = useContext(AppContext);

  return (
    <div className='w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mt-[185px] mb-[190px] justify-center items-center h-screen'>
      {
        loading ? (<Spinner />) : 
        (posts.length === 0 ? (
          <div>
            <p>No Post Found</p>
          </div>
        ) : (
          posts.map( (post) => (
            <BlogDetails key={post.id} post = {post} />
          ))
        ))
      }
    </div>
  )
}

export default Blog