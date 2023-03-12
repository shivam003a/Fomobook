import '../App.css'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

    const [isActive, setActive] = useState(true);

    const handleNavbar = () => {
        setActive(!isActive);
    }
    const hideMenu = ()=>{
        setActive(!isActive)
    }
    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <h2>FomoBook</h2>
                </div>
                <div className={isActive ? "navbar-right none" : "navbar-right"}>
                    <ul>
                        <li><NavLink to='/' onClick={hideMenu}>Home</NavLink></li>
                        <li><NavLink to='/posts' onClick={hideMenu}>Posts</NavLink></li>
                        <li><NavLink to='/upload' onClick={hideMenu}>Upload</NavLink></li>
                        <li><NavLink to='/profile' onClick={hideMenu}>Profile</NavLink></li>
                        <li><NavLink to='/login' onClick={hideMenu}>Login</NavLink></li>
                        <li><NavLink to='/register' onClick={hideMenu}>Register</NavLink></li>
                        <li><NavLink to='/logout' onClick={hideMenu}>Logout</NavLink></li>
                    </ul>
                </div>
                <div className='btn submit'>
                    <button onClick={handleNavbar}>Menu</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;