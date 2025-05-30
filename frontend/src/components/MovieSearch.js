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

    

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFinalTitle(title);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/find-movie', {
                title: title
            });
            setMovieData(response.data);
            
            
        } catch(error) {
            console.log('ERROR:', error.message);
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


    if (!isLoading && movieData === null){
        return(
        <div className='centered'>
            <div className='no-results'>
                <div className='search-title'>
                    <img src='/movieicon.png' class='icon'></img>
                    <h1>Search for a Movie!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Title' value={title} required onChange={(e)=>{setTitle(e.target.value)}}></input>
                    <button><img src='/searchicon.png' class='search-icon'/></button>
                </form>
            </div>
        </div>
        
        )

    }else if( !isLoading && movieData.length === 0){
        return (
        <div>
            <h1>No Results found for '{finalTitle}'</h1>
        </div>
    )
    }
    if(!isLoading && movieData.length > 0){
        return(
           <div className='with-results'>
                <h1>Results for '{finalTitle}'</h1>
                {movieData.map((movie) => {
                     return <Card key={movie['id']} title={movie['title']} id={movie['id']} overview={movie['overview']} year={movie['release_date'].substring(0,4)}/>;
                })}
           </div>
        );
    }
}


export default MovieSearch;