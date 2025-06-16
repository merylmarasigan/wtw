import React, { useState } from 'react'
import '../styling/layout.css'
import '../styling/Search.css'
import axios from 'axios';  
import Card from './Card';

const MovieSearch = () => {
    const [title, setTitle] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [finalTitle, setFinalTitle] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFinalTitle(title);
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://wtw-production.up.railway.app/find-movie', {
                title: title
            });
            console.log('MOVIE DATA:', response.data.length)
            setMovieData(response.data);
            
            
        } catch(error) {
            if (error.response && (error.response.status === 500 || error.response.status ===  404)) {
                // Custom error message from backend
                const backendErrorMessage = error.response.data?.error;
                if (backendErrorMessage) {
                    setError(backendErrorMessage); // "Failed to search movies"
                } else {
                    setError('Server error occurred');
                }
            }

            // if (error.response && error.response.status === 500) {
            //     // Custom error message from backend
            //     const backendErrorMessage = error.response.data?.error;
            //     if (backendErrorMessage) {
            //         setError(backendErrorMessage); // "Failed to search movies"
            //     } else {
            //         setError('Server error occurred');
            //     }
            // }
        }finally{
            setLoading(false);
        }
    }

    if(isLoading){
        return(
        <div className='centered'>
            <div className='spinner'></div>
        </div>)
    }

    if(error){
        return(
            <div className='centered'>
                <p>{error}</p>
            </div>
        )

    }


    if (!isLoading && movieData === null){
        return(
        <div className='centered'>
            <div className='no-results'>
                <div className='search-title'>
                    <img src='/camera-reels-fill.svg' class='icon'></img>
                    <h1>Search for a Movie!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='search' placeholder='Title' value={title} required onChange={(e)=>{setTitle(e.target.value)}}></input>
                    <button><img src='/searchicon.png' class='search-icon'/></button>
                </form>
            </div>
        </div>
        
        )

    }
    if( !isLoading && movieData.length === 0){
        return (
        <div className='centered'>
            <h1>No results found for '{finalTitle}'</h1>
        </div>
    )
    }
    if(!isLoading && movieData.length > 0){
        return(
           <div className='with-results'>
                <h1>Results for '{finalTitle}'</h1>
                {movieData.map((movie) => {
                     return <Card key={movie['id']} title={movie['title']} id={movie['id']} overview={movie['overview']} year={movie['release_date'].substring(0,4)} type='movie'/>;
                })}
           </div>
        );
    }
}


export default MovieSearch;