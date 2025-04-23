import TourCard from './TourCards';

const Gallery = ({ tours, removeTour, refetchTours }) => {
  return (
    <div className="gallery">
      {tours.length === 0 ? (
        <div className="empty-tours">
          <h3>No Tours Left</h3>
          <button className="refresh-btn" onClick={refetchTours}>
            Refresh
          </button>
        </div>
      ) : (
        <div className="tours-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} removeTour={removeTour} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery