import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://course-api.com/react-tours-project')
        if (!response.ok) {
          throw new Error(`Failed to fetch tours: ${response.status} ${response.statusText}`)
        }
        try {
          const data = await response.json()
          setTours(data)
        } catch (jsonError) {
          throw new Error('Failed to parse JSON response')
        } finally {
          setLoading(false)
        }
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

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
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : (
        <Gallery tours={tours} removeTour={removeTour} />
      )}
    </main>
  )
}

export default App