import img from '../img/JMDM5fS.jpeg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleExplore = ()=>{
        navigate('/posts')
    }
    const handleLogin = ()=>{
        navigate('/login')
    }
    return (
        <>
            <section className="home">
                <h1>Unleash Your Creativity</h1>
                <span>Share and Discover Stunning Photos on Our Platform Anonymously</span>
                <div>
                    <button onClick={handleExplore}>Explore</button>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </section>
        </>
    )
}

export default Home;