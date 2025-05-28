import react from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css'

const Header = () => {
    return (
    <div className='header'>
        <Link to='/'>WhereToWatch</Link>

        <div className='links'>
            <Link to='/movie-search'>Movie</Link>
            <Link to='/series-search'>Series</Link>
        </div>
    </div>)
}

export default Header;