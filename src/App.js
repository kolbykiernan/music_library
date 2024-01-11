import logo from './logo.svg';
import './App.css';

import Gallery from './components/Gallery';
import Searchbar from './components/Searchbar';
import { DataContext } from './context/DataContext';
import { useEffect, useState } from 'react';



function App() {

  let [search, setSearch] = useState()
  let [message, setMessage] = useState()
  let [data, setData] = useState([])

  const API_URL = ('https://itunes.apple.com/search?term=');

  useEffect(() => {
    const fetchData = async () => {
      document.title = `${search} Music`
      const response = await fetch(`${API_URL} + ${search}`)
      const resData = await response.json()
      if (resData.results.length > 0) {
        setData(resData.results)
      } else {
        setMessage('Not Found')
      }
    }
    if (search){
    fetchData()
    }
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className="App">
      <Searchbar handleSearch = {handleSearch} />
      {message}
      <DataContext.Provider value = {data}/>
      <Gallery data = {data} />
    </div>
  );
}

export default App;
