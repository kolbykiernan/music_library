import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import GalleryItem from "./GalleryItem"

//gallery function is in charge of parsing through our data with the .map method, identifying unique id's for each song/album, and displaying our results
const Gallery = () => {
    
    const data = useContext(DataContext)
    const display = data.map ((item, index) => {
        return(   
            <GalleryItem item={item} key={index} />
        )
    })
    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery

