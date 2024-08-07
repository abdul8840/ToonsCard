// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/getcategories');
        const data = await response.json();
        
        if (Array.isArray(data)) { // Ensure data is an array
          setCategories(data);
        } else {
          console.error('Unexpected response format', data);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getposts?limit=16`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="">
      <Hero />
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
      </div>
      <div className='max-w-6xl mx-auto p-3'>
      
      <div className="flex flex-wrap my-5 gap-4">
        {categories.length > 0 ? ( // Check if there are categories to display
          categories.map((category) => (
            <div
              key={category._id}
              className="w-[300px] border-2 border-slate-500 rounded-md p-2"
              onClick={() => handleCategoryClick(category._id)}
            >
              <img src={category.image} alt={category.name} className='h-[150px] object-cover rounded-md' />
              <h2 className='text-slate-600 font-semibold text-xl mt-2'>{category.name}</h2>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
      <div className="">
      <h1 className='text-3xl my-6 text-center text-slate-600 font-bold'>All Cards</h1>
      <div className="mt-5 ml-6 mb-2">
      <Link
              to={'/all-cards'}
              className='text-lg text-teal-500 hover:underline'
            >
              View all Cards
            </Link>
      </div>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <div key={post._id} className="w-[350px] bg-white border-2 border-slate-500 rounded-md p-3 flex flex-col gap-2">
                    <p className='text-center text-slate-600 text-xl font-bold'>{post.title}</p>
                    <div className="card-bg">
                        <img src={post.image} className='w-full h-[200px] object-contain' alt="" />
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
        )}
        
      </div>
      <div className="text-center mt-5">
      <Link
              to={'/all-cards'}
              className='text-lg text-teal-500 hover:underline'
            >
              View all Cards
            </Link>
      </div>
      
    </div>
    </div>
  );
};

export default Home;
