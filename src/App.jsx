import React, { useContext, useEffect} from 'react'
import Header from './components/Header'
import Blog from './components/Blog'
import Pagination from './components/Pagination'
import { AppContext } from './context/AppContext'

function App() {
  const {fetchBlogPosts} = useContext(AppContext);

  useEffect( ()=> {
    fetchBlogPosts();
  },[] );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-1">
      <Header />
      <Blog />
      <Pagination />
    </div>
  )
}

export default App
