import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Posts from './components/Posts';
import Profile from './components/Profile';
import SingleImage from './components/SingleImage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:id' element={<SingleImage />} />
      </Routes>
    </>
  );
}

export default App;
