import './css/App.css'
import Home from './pages/home'
import { Routes, Route } from 'react-router-dom'
import Favorites from './pages/favorites'
import Navbar from './components/Navbar'
import { MovieProvider } from './contexts/MovieContext'

function App() {

  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App
