import react from 'react'
import '../styling/layout.css'
import '../styling/Search.css'


const MovieSearch = () => {
    return(
    <div className='centered'>
        <h1> Search for a Movie!</h1>
        <form>
            <input type='text' required placeholder='Title'></input>
            <button>Search</button>
        </form>

    </div>);
};

export default MovieSearch;