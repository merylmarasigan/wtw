import react from 'react'
import '../styling/Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleMovieClick= () => {
            navigate(`/movie-search`)
    }


    const handleSeriesClick= () => {
        navigate(`/series-search`)
}
    return (

       
        <div className='home-body'>
            <div>
                <h1>Find where your favorite movies and shows are streaming!</h1>
                <div>
                    {/* <button onClick={handleMovieClick}>
                        <div className='inner-button'>
                            Movie
                            <img src='/brokenReel.png' class='white-icon'/>
                        </div>
                    </button> */}
                    <button onClick={handleMovieClick}>Movie</button>
                    <button onClick={handleSeriesClick}>Series</button>
                </div>
            </div>
        </div>
    );
}

export default Home;