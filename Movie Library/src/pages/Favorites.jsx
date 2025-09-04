import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import  MovieCard  from "../components/MovieCard"

function Favorites(){

    const {favorites} = useMovieContext();

    if(favorites){
        return <div>
        <h2>Your Favorite Movies</h2>
    <div className = "movies-grid">
            {favorites.map(
                (movie) =>  (<MovieCard key={movie.id} movie={movie}/>))}
        </div>
        </div>
    }
    return <div className="favorites-empty">
        <h2>Your Favorite Movies</h2>
        <p>No favorite movies added yet.</p>
    </div>
}

export default Favorites