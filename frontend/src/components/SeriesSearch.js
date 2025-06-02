import react, { useState } from 'react'
import axios from 'axios';
import Card from './Card';
import '../styling/layout.css'
import '../styling/Search.css'


const SeriesSearch = () => {

    const [title, setTitle] = useState('');
    const [seriesData, setSeriesData] = useState(null);
    const [finalTitle, setFinalTitle] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error , setError] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();

        setFinalTitle(title);
        setLoading(true);

        //call to our express server
        try{
            const response = await axios.post('http://localhost:5000/find-series', {title: title});

            setSeriesData(response.data);

            console.log(seriesData);
        }catch(error){
            console.log('ERROR:', error.message)
        }finally{
            setLoading(false);
        }
    }

    if(isLoading){
        return(
            <div className='centered'>
                <div className='spinner'></div>
            </div>
        );
    }

    if(!isLoading && seriesData === null){
        return(
            <div className='centered'>
                <div className='no-results'>
                    <div className='search-title'>
                        <img src='/tvicon.png' class='icon'></img>
                        <h1>Search for a Series!</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Title' value={title} required onChange={(e)=>{setTitle(e.target.value)}}></input>
                        <button><img src='/searchicon.png' class='search-icon'/></button>
                    </form>
                </div>
            </div>
            
            )
    
    }


    if(!isLoading && seriesData.length === 0){
        //api call was successful but no results were found

       return ( <div>
            <h1>No Results found for '{finalTitle}'</h1>
        </div>
       );
    }
    if(!isLoading && seriesData.length >0){
        return(
            <div className='with-results'>
                <h1>Results for '{finalTitle}'</h1>
                {seriesData.map((series) => {
                     return <Card key={series['id']} title={series['title']} id={series['id']} overview={series['overview']} year={series['release_date'].substring(0,4)} type='tv'/>;
                })}

            </div>
        )
    }


};

export default SeriesSearch;