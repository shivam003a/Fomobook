import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleImage = ()=>{

    const navigate = useNavigate();
    const [singleUrl, setSingleUrl] = useState("");
    
    const { id } = useParams();

    const fetchImage = async ()=>{
        const res = await fetch(`${id}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            },
            credentials : "include"
        })

        const data = await res.json();

        if(res.status === 201){
            setSingleUrl(data[0].url);
            console.log(singleUrl)
        }
        else{
            console.log('eror loading image')
        }
    }

    const deletePost = async ()=>{


        const res = await fetch('/delete', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id
            })
        })

        if(res.status === 201){
            window.alert("deleted");
            navigate('/profile');
        }
        else{
            window.alert("not deleted");
        }
    }


    useEffect(()=>{
        fetchImage();
    }, [])


    return (
        <>
            <div className="model">
                <div className="model-up">
                    <img src={singleUrl} />
                </div>
                <div className="model-down">
                    <button onClick={deletePost}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default SingleImage;