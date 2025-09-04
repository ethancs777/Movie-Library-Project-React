import React, { useState, useEffect, } from "react";
import MovieCard from "../components/MovieCard"
import '../css/Home.css'
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("Descending (A-Z)");

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

    // Sorting logic
    const getSortedMovies = () => {
        let sorted = [...movies];
        switch (sortOption) {
            case "Descending (A-Z)":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "Ascending (Z-A)":
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "Release Date (Newest)":
                sorted.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
                break;
            case "Release Date (Oldest)":
                sorted.sort((a, b) => (a.release_date || "").localeCompare(b.release_date || ""));
                break;
            case "Rating (Highest)":
                sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
                break;
            case "Rating (Lowest)":
                sorted.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
                break;
            default:
                break;
        }
        return sorted;
    };

    return (
        <div className="home">
            <div className="movies-header">
                <select
                    className="sort-dropdown"
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                >
                    <option value="Descending (A-Z)">Descending (A-Z)</option>
                    <option value="Ascending (Z-A)">Ascending (Z-A)</option>
                    <option value="Release Date (Newest)">Release Date (Newest)</option>
                    <option value="Release Date (Oldest)">Release Date (Oldest)</option>
                    <option value="Rating (Highest)">Rating (Highest)</option>
                    <option value="Rating (Lowest)">Rating (Lowest)</option>
                </select>
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
                    {getSortedMovies()
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