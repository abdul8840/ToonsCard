import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Cars results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => (
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
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}