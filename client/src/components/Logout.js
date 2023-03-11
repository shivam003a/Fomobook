import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    const clearCookie = async () => {
        try {
            const res = await fetch('/logout', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            if (res.status !== 201) {
                throw new Error(res.error);
            }
            window.alert("successful")
            navigate('/login');
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        clearCookie();
    }, []);

    return (
        <>
            <h1></h1>
        </>
    )
};

export default Logout;