import { useState, useEffect } from 'react'
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

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <main>
      <div className="title">
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
      <div className="tours">
        {tours.length === 0 ? (
          <p>No tours available</p>
        ) : (
          <pre>{JSON.stringify(tours, null, 2)}</pre>
        )}
      </div>
    </main>
  )
}

export default App