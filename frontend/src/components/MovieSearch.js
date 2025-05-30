import react, { useState, useEffect } from 'react'
import '../styling/layout.css'
import '../styling/Search.css'
import axios from 'axios';  
import Card from './Card';

const MovieSearch = () => {
    const [title, setTitle] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [finalTitle, setFinalTitle] = useState('');

    

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFinalTitle(title);
        try {
            const response = await axios.post('http://localhost:5000/find-movie', {
                title: title
            });
            setMovieData(response.data);
            
            
        } catch(error) {
            console.log('ERROR:', error.message);
        }
    }


    if(movieData === null){
        return(
        <div className='centered'>
            <div className='no-results'>
                <h1>Search for a Movie!</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Title' value={title} required onChange={(e)=>{setTitle(e.target.value)}}></input>
                    <button>Search</button>
                </form>
            </div>
        </div>
        
        )

    }else{
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