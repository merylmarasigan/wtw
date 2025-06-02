import React from "react";
import "../styling/Card.css"
import { Link } from "react-router-dom";

const Card = (props) => {
    return(
    <div className='card'>
        <h3>
            <Link 
            to='/streaming'
            state={{title: props.title, id: props.id, type:props.type}}
            className='h'
            >
                {props.title}
            </Link>
        </h3>
        <p className='year'>{props.year}</p>
        <hr/>
        <p className='overview'>{props.overview}</p>

    </div>);
};

export default Card;