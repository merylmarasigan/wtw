import React from "react";
import "../styling/Card.css"
import { Link } from "react-router-dom";

const Card = (props) => {
    return(
    <div className='card'>
        <h3>
            <Link 
            to='/streaming'
            state={{title: props.title, id: props.id }}
            className='h'
            >
                {props.title}
            </Link>
            </h3>
        <hr/>
        <p>{props.overview}</p>

    </div>);
};

export default Card;