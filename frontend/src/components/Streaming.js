import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import axios from 'axios'

import StreamingCard from "./StreamingCard";

const Streaming = () => {
    const loc = useLocation();
    const {title, id} = loc.state || {};
    const [isLoading, setLoading] = useState(false)
    const [sites, setSites] = useState([]);

    useEffect(() => {
        // Create an async function inside useEffect
        setLoading(true);
        const fetchStreamingData = async () => {
            try{
                const response = await axios.post(`http://localhost:5000/where-to-stream`, {
                    id: id, 
                    type:'movie'
                });
                setSites(response.data); 
            }catch(error){
                console.log(error.message);
            }finally{
                setLoading(false)
            }
        };

        // Only call the function if id exists
        if (id) {
            fetchStreamingData();
        }

    }, [id]); 

    if(isLoading){
        return(
        <div className='centered'>
            <div className='spinner'></div>
        </div>)
    }
    return(
        <div className='horizontal-center'>
         
         <h1>Where to Stream '{title}' </h1>
         {Object.keys(sites).length > 0 && <div class='sc'>
              {Object.keys(sites).map(s => {
             return <StreamingCard country={s} sites={sites[s]}/>
         })}
         </div>}

         {Object.keys(sites).length ===  0 && 
         <div className='no-streaming-info-found'>
            <p>No streaming information found</p>
         </div>
         }
       
        </div>
    )
}

export default Streaming;