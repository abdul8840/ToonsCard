import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function CategoryPost() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/post/getposts`);
          const data = await res.json();
          setPosts(data.posts);
        };
        fetchPosts();
      }, []);

      console.log(posts)

      const Posts = posts.filter((post) => post.category === categoryName);

  return (
    <div>
      <div className='max-w-6xl mx-auto p-3'>
        {Posts && Posts.length > 0 ? (
          <div className='flex flex-col gap-6'>
            <h1 className='text-3xl my-6 text-center text-slate-600 font-bold'>Category : {categoryName}</h1>
            <div className='flex flex-wrap gap-4 justify-center'>
              {Posts.map((post) => (
                <div key={post._id} className="w-[350px] bg-white border-2 border-slate-500 rounded-md p-3 flex flex-col gap-2">
                    <p className='text-center text-slate-600 text-xl font-bold'>{post.title}</p>
                    <div className="card-bg">
                        <img src={post.image} className='w-full h-[200px] object-contain' alt="" />
                    </div>
                    <div className="block">
                      <p className='text-sm border-2 rounded-md border-slate-500 p-1'>{post.description}</p>
                    </div>
                    <div className="flex flex-wrap mt-2 gap-2 justify-center">
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Category : </span>{post.category}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Height : </span>{post.height}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Weight : </span>{post.weight}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Gender : </span>{post.gender}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Ability : </span>{post.ability}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Hobbies : </span>{post.hobbies}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Family : </span>{post.faname}</p>

                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>HP : </span>{post.hp}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Speed : </span>{post.Speed}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Attack : </span>{post.attack}</p>
                    <p className='text-sm border-2 rounded-md border-slate-500 p-1'><span className='font-semibold text-slate-600'>Defence : </span>{post.defense}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        ):(
          <p>No Cards Available in {categoryName}</p>
        )}
      </div>

    </div>
  )
}
