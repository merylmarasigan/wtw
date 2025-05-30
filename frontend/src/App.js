import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MovieSearch from './components/MovieSearch';
import SeriesSearch from './components/SeriesSearch';
import Footer from './components/Footer';
import TitleMatches from './components/TitleMatches';
import Streaming from './components/Streaming';
import { Routes, Route, useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();


  return (
    <div className="App">
     <Header/>
     <div className='main-content'>
     <Routes>
      <Route exact path='/' element={<Home/>}></Route>

      <Route exact path='/movie-search' element={<MovieSearch key={location.key}/>}></Route>

      <Route exact path='/series-search' element={<SeriesSearch/>}></Route>

      <Route path='/title-matches' element={<TitleMatches/>}></Route>

      <Route path='/streaming' element={<Streaming/>}></Route>

      <Route path='*' element={<p>Page Not Found</p>}></Route>
     </Routes>

     </div>
     
     <Footer/>
    </div>
  );
}

export default App;
