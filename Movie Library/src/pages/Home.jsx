
import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard"
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to load movies. Please try again later.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularMovies();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            if (!searchQuery.trim()) {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                setError(null);
            } else {
                const results = await searchMovies(searchQuery);
                setMovies(results);
                setError(null);
            }
        } catch (error) {
            console.log(error);
            setError("Failed to search movies. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
                <div className="movies-header">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
                {error && <p className="error">{error}</p>}
                {loading ? (
                    <p>Loading movies...</p>
                ) : (
                    <div className="movies-grid">
                        {movies
                            .filter((movie) => movie.poster_path)
                            .map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                    </div>
                )}
            </div>
    );
}
export default Home