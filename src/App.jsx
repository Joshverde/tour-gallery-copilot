import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTours = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://www.course-api.com/react-tours-project')
      if (!response.ok) {
        throw new Error(`Failed to fetch tours: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      console.log('Fetched tours:', data) // Add this line to debug
      setTours(data)
    } catch (error) {
      console.error('Fetch error:', error) // Add this line to debug
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const removeTour = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id)
    setTours(updatedTours)
  }

  return (
    <main>
      <div className="title">
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
      {loading ? (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      ) : error ? (
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={fetchTours}>Try Again</button>
        </div>
      ) : (
        <Gallery tours={tours} removeTour={removeTour} refetchTours={fetchTours} />
      )}
    </main>
  )
}

export default App