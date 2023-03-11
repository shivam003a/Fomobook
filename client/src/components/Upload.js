import { useState } from 'react';
import storage from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { NavLink} from 'react-router-dom';

const Upload = () => {

    const [url, setUrl] = useState("");
    const [caption, setCaption] = useState("");

    const handleImage = (e) => {
        const file = e.target.files[0];
        console.log(file);

        if (!file) {
            return;
        }
        const storageRef = ref(storage, `images/${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(storageRef, file).then((url) => {
                setUrl(url);
            })
        }).catch((err) => {
            console.log("upload failed");
        })
    }

    const handleCaption = (e) => {
        setCaption(e.target.value);
        console.log(caption)
    }

    const sendData = async () => {
        try {

            const res = await fetch('/upload/submit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url, caption
                })
            })

            if (res.status === 201) {
                window.alert("uploaded");
            }
            else {
                window.alert("Error");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='uploads'>
                <div className='form-left' >
                    <h2>Are you a budding photographer or graphic designer? Upload your image and showcase your skills to the public</h2>
                    <span>Whether you're an aspiring photographer or simply want to share a beautiful moment with the world, by uploading your image here you'll have the opportunity to connect with others, showcase your creativity, and leave a lasting impression on those who view your work.</span>
                    <NavLink to='/posts'>Explore</NavLink>
                </div>
                <div className='form-right'>
                    <h2>Upload</h2>
                    <input type="text" placeholder="Enter caption" name="caption" onChange={handleCaption} />
                    <input type="file" name="image" onChange={handleImage} />
                    <input type="submit" className='submit' placeholder="Submit"
                        onClick={sendData} />
                </div>
            </div>
        </>
    )
}

export default Upload;