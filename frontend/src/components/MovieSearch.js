import react, { useState, useEffect } from 'react'
import '../styling/layout.css'
import '../styling/Search.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // ← Make sure this line is here
import Card from './Card';

const MovieResults = (props) => {
    const movieTitle = props.title
    return(
        <div>
            <h1>Showing Results for '{movieTitle}'</h1>
        </div>
    );
}

const MovieSearch = () => {
    const [title, setTitle] = useState('');
    // const [showingResults, setShowingResults] = useState(false);
    const [movieData, setMovieData] = useState(null);
    const [finalTitle, setFinalTitle] = useState('')

    // useEffect(() => {
    //     if(movieData){
    //         console.log('Movie data updated:', movieData);
    //     }
    // },[movieData])

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



    // if(movieData !== null){
    //     // return <MovieResults title={title}/>
    //     return(
    //         <div>
    //             <MovieResults title={title}/>
    //             {movieData}
    //         </div>
    //     )
    // }

    // return(
    //     <div className='centered'>
    //         {movieData === null && <div className='no-results'>
    //             <h1>Search for a Movie!</h1>
    //             <form onSubmit={handleSubmit}>
    //                 <input type='text' placeholder='Title' value={title} required onChange={(e)=>{setTitle(e.target.value)}}></input>
    //                 <button>Search</button>
    //             </form>
    //         </div>}
    //         {movieData!== null && <div>
    //             <h1>Results for '{finalTitle}'</h1>
    //             {movieData.map((movie) => {
    //                  return <Card key={movie['id']} title={movie['title']} id={movie['id']} overview={movie['overview']}/>;
    //             })}
    //         </div>}

    //         {/* {movieData !== null && <div className='with-results'>
    //             <h1>Showing Results for '{finalTitle}'</h1>

    //             {movieData.map((movie) => {
    //                  return <Card key={movie['id']} title={movie['title']} id={movie['id']} overview={movie['overview']}/>;
    //             })}

    //         </div>} */}


    //     </div>
    // )

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