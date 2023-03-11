import { useEffect, useState } from "react"


const Posts = () => {

    const [post, setPost] = useState([]);

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const getPosts = async () => {
        try {
            const res = await fetch('/posts', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })
            const data = await res.json();
            console.log(data);
            if (data.length >= 2) {
                console.log(data)
                setPost(shuffleArray(data));
            }
            else {
                window.alert('error fetching post');
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            <div className="posts" >
                {
                    post.map((p) => {
                        return (
                            <>
                                <div className="posts-sub">
                                    <img className="posts-img" src={p.url} />
                                    <span>{p.caption}</span>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Posts;