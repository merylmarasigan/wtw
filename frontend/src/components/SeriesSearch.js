import react from 'react'
import '../styling/layout.css'
import '../styling/Search.css'


const SeriesSearch = () => {
    return(
    <div className='centered'>
        <h1> Search for a Series!</h1>
        <form>
            <input type='text' required placeholder='Title'></input>
            <button><img src='/searchicon.png' class='search-icon'/></button>
        </form>

    </div>);
};

export default SeriesSearch;