import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import axios from 'axios'

import StreamingCard from "./StreamingCard";

const Streaming = () => {
    const loc = useLocation();
    const {title, id} = loc.state || {};

    const [sites, setSites] = useState([]);

    useEffect(() => {
        // Create an async function inside useEffect
        const fetchStreamingData = async () => {
            try{
                const response = await axios.post(`http://localhost:5000/where-to-stream`, {
                    id: id, 
                    type:'movie'
                });
                setSites(response.data); // Don't forget to update your state!
            }catch(error){
                console.log(error.message);
            }
        };

        // Only call the function if id exists
        if (id) {
            fetchStreamingData();
        }

    }, [id]); // This is correct

    return(
        <div class='horizontal-center'>
         
         <h1>Where to Stream '{title}' </h1>
         <div class='sc'>
              {Object.keys(sites).map(s => {
             return <StreamingCard country={s} sites={sites[s]}/>
         })}
         </div>
       
        </div>
    )
}

export default Streaming;