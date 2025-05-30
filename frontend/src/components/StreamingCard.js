import React from "react";
import '../styling/StreamingCard.css'
const StreamingCard = (props => {
    return ( 
    <div className='s-card'>
        <h2>{props.country}</h2>

        <hr/>

        {props.sites.map(s =>{
            return <p>{s}</p>
        })}



    </div>);
});
 
export default StreamingCard;