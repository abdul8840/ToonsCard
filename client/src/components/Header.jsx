import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 flex items-center justify-between px-4">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Sahand's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      <div className="flex items-center gap-2">
        <Button className="w-12 h-10 hidden sm:inline rounded-full" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button className="text-black font-semibold border-2 border-slate-500" outline>
            Sign In
          </Button>
        </Link>
        
      </div>
    </Navbar>
  );
}