import { useEffect, useState } from 'react';
import img from '../img/user.png';
import { NavLink } from 'react-router-dom';

const Profile = () => {

    const [profileEmail, setProfileEmail] = useState("");
    const [profileName, setProfileName] = useState("");
    const [profileList, setProfileList] = useState([]);

    const getProfileData = async () => {
        try {
            const res = await fetch('/profile', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();

            console.log(data);
            if (res.status === 201) {
                setProfileEmail(data.email);
                setProfileName(data.name);
                setProfileList(data.filteredList);
            }
            else {
                window.alert("error")
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <>
            <div className='profile'>
                <div className='up'>
                    <img src={img} />
                    <h2 className='profile-name'>{profileName}</h2>
                    <p>{profileEmail}</p>
                    <p>Posts : {profileList.length}</p>
                </div>
                <div className="down">
                    <h2 className='down-sub-1'>My Uploads</h2>
                    <div className="down-sub">
                        {
                            profileList.map((e) => {
                                return <NavLink to={`${e._id}`}><img src={e.url} className="profile-img" /></NavLink>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;