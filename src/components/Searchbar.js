
import { useState } from 'react'
//function that lets us change the state of the searchbar, in this bar the user can enter a term, we will plug in the handleSearch function defined in app.js, to change the search term based in the value recieved
function Searchbar(props){
    let [searchTerm, setSearchTerm] = useState('')
    return(
            <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>
                <input 
                type = "text" 
                placeholder='Search for music' onChange={
                    (e) => setSearchTerm(e.target.value)}
                />
                <input type = "submit" />
            </form>
    )
}

export default Searchbar