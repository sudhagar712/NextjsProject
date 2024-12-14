/* eslint-disable @next/next/no-img-element */
"use client"
import {useState, useEffect , useRef} from "react"
import Link from "next/link"


export default function Home() {
const [postData , setPostData] = useState([]);
const [search , setSearch] = useState(false)

 const inputRef= useRef("")

useEffect(()=>{

  fetch("http://localhost:3000/api/posts")
  .then((res) => res.json())
  .then(res =>setPostData(res) )
},[])



const searchbtn = () => {
  setSearch(true)
  setTimeout(()=>{
     fetch("http://localhost:3000/api/posts?q=" + inputRef.current.value)
   .then((res) => res.json())
   .then(res =>setPostData(res) )
   .finally(()=>  setSearch(false))
  }, 1000)
  

}

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-4  ">Welcome to Our Blog</h2>
        <h6>Latest Blog Pages Content is Here</h6>
      </main>

      <div className="flex justify-end px-4">
        <input
          type="text"
          ref={inputRef}
          className="px-4 py-2 border border-gray-300 outline-0 focus:border-2 focus:border-violet-400 rounded-md"
          placeholder="Search..."
        />
        <button onClick={searchbtn} disabled={search} className="px-4 py-2 bg-violet-400 hover:bg-violet-500 text-white rounded-md ml-4">
          {search ? "..." : "search"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6">
        {postData.map ((post, index) => (
          <Link href={"/post/" + post._id} key={index}>
            <div className="border border-gray-200 p-4">
              <img
                className="w-full h-48 object-cover mb-4"
                src={post.image}
                alt={post.title}
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <h6 className="text-gray-600">{post.description}</h6>
            </div>
          </Link>
        ))}
{

 !postData.length > 0 && inputRef.current.value && <p>No post available for this query: <b>{inputRef.current.value}</b></p>
}
       
      </div>
    </>
  );
}
