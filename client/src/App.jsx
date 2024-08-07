import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AllCards from './pages/AllCards';
import 'flowbite/dist/flowbite.css';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import CreateCategory from './pages/CreateCategory';
import UpdatePost from './pages/UpdatePost';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/create-category' element={<CreateCategory />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
      </Route>
      <Route path='/all-cards' element={<AllCards />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
