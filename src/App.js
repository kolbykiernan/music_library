

import './App.css';
//importing hooks from react//
import { useEffect, useState, Fragment } from 'react';
//allows us to import components from the react-router dom, a library that helps control the overall navigation and routes//
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//an alternative to using props, which allows us to pass properties without specifying it as a parameter for each function//
import { DataContext } from './context/DataContext';

//other components with code that end up feeding into the code you see below//
import Gallery from './components/Gallery';
import Searchbar from './components/Searchbar';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';



//main function that makes our project work, this is exported at the bootome and imported as a component into our index.js file//
function App() {

//below are are variables that will change state, all of them are subject to change basaed on the user's flow
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])


  //iTunes API that will allow us to use this have access to their libraries//
  const API_URL = ('https://itunes.apple.com/search?term=');

  //hook that will allow us to fetch data between iTunes and the user's search
  useEffect(() => {
  // Upon searching, we are changing the title top match the search, we are fetching the data through the iTunes API, we are writing and if else statement for the user based on if there are results that match their search or not//
    if (search){
    const fetchData = async () => {
      document.title = `${search} Music`
      const response = await fetch(API_URL + search)
      const resData = await response.json()
      if (resData.results.length > 0) {
        //function allows us to change the state of the data receieved based on the results//
        setData(resData.results)
      } else {
      //function allows us to change the state of the message displayed based on the results //
        setMessage('Not Found')
        }
      }
      //invoking the fetchData function
      fetchData()
    }
    //'search' in the dependency array allows us to re-render our code every time the value of search changes, otherwise it will only mount once, which i believe means you can only make one search request
  }, [search]);

  //function allows us to change the state or in this case term of the search, this will be called in the JSX return below
  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

//UI component
  return (
    //returning the data of the search, see line 41, the message, see line 44, and the available routes//
    //the first route returns our searchbar component and our gallery componenet when the path is "/". The second and third route return our AlbumView and ArtistView component when the path is "/album:id and "/artist:id"
    <DataContext.Provider value={data}>
      <div className="App">
        {message}
        <Router>
          <Routes>
            <Route path="/" element = {
              <Fragment>
                <Searchbar handleSearch = {handleSearch} />
                <Gallery/>
              </Fragment>
            } />
            <Route path="/album:id" element={<AlbumView />} />
            <Route path="/artist:id" element={<ArtistView />} />
          </Routes>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

//allows us to push this function to index.js
export default App;
