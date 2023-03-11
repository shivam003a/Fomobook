import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitData = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })


        if (res.status === 201) {
            window.alert("Logged in")
            navigate('/posts');
        }
        else {
            window.alert("Error");
        }
    }
    return (
        <>
            <div className="login">
                <div className='login-left'>
                    <h2>Ready to dive back in? Let's get you logged in!</h2>
                    <span>By logging in to your account, you'll gain access to a world of exciting features and personalized content, tailored specifically to your needs and preferences, so why wait? Enter your login credentials now and start exploring all that we have to offer!"</span>
                    <NavLink to='/register'>Register</NavLink>
                </div>
                <form method="POST" className='login-right'>
                    <h2>Login</h2>
                    <input type="email" name="email" value={user.email} placeholder="e-mail" autoComplete="off"
                        onChange={handleInput}
                    />
                    <input type="password" name="password" value={user.password} placeholder="password" autoComplete="off"
                        onChange={handleInput}
                    />
                    <input type="submit" className='submit' placeholder="Submit"
                        onClick={submitData} />
                </form>
            </div>
        </>
    )
}

export default Login;