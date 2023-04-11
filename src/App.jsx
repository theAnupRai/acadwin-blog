import React, { useContext, useEffect} from 'react'
import { AppContext } from './context/AppContext'
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import BlogPage from './Pages/BlogPage';
import TagPage from './Pages/TagPage';
import CategoryPage from './Pages/CategoryPage';
import Home from './Pages/Home';

function App() {
  const {fetchBlogPosts} = useContext(AppContext);

  const[searchParams, setUseParams] = useSearchParams();
  const loaction = useLocation();

  useEffect( ()=> {
    const page = searchParams.get("page") ?? 1;

    if(loaction.pathname.includes("tags")) {
      //  it means hame tag wale page ko show karna hai
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag )
    }

    else if (location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), null, category)
    }

    else {
      fetchBlogPosts(Number(page));
    }

  },[location.pathname, loaction.search]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-1">
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/blog:blogID' element= {<BlogPage/>} />
        <Route path='/tags/:tag' element= {<TagPage/>} />
        <Route path='/categories/:category' element= {<CategoryPage/>} />
      </Routes>
    </div>
  )
}

export default App
