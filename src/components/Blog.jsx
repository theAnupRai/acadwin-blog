import React from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react';
import Spinner from './Spinner'

const Blog = () => {
  const {loading, posts} = useContext(AppContext);

  return (
    <div className='w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mt-[66px] mb-[70px] justify-center items-center h-screen'>
      {
        loading ? (<Spinner />) : 
        (posts.length === 0 ? (
          <div>
            <p>No Post Found</p>
          </div>
        ) : (
          posts.map( (post) => (
            <div key={post.id}>
              <p className='font-bold text-lg text-pink-300'>{post.title}</p>
              <p className='text-sm'>
                By <span className='italic'>{post.author}</span> on <span className='underline font-bold'>{post.category}</span>
              </p>
              <p className='text-sm mt-[4px]'>Posted on {post.date}</p>
              <p className='text-md mt-[14px]'>{post.content}</p>
              <div className='flex gap-x-3'>
                {
                  post.tags.map( (tag, index) => {
                    return <span className='b to-blue-500 underline font-bold text-[8px]' key={index}>{`#${tag}`} </span>
                  })
                }
              </div>
            </div>
          ))
        ))
      }
    </div>
  )
}

export default Blog