import 'bootstrap/dist/css/bootstrap.css'; 
import Carousel from 'react-bootstrap/Carousel'; 

function LandCard({ land }) {
  const {
    land_media,
    total_price,
    village_name,
    mandal_name,
    district_name,
    total_land_size_in_acres: { acres, guntas },
  } = land;

  return (
    <div className="land-card">
      <Carousel>
        {land_media.map((image) => (
          <Carousel.Item key={image.id}>
            <img className="d-block w-100" src={image.image} alt="Land" />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="land-details">
        <p>₹ {total_price} Crore</p>
        <p>
          {village_name}, {mandal_name}, {district_name}
        </p>
        <p>
          {acres} Acres {guntas} Guntas
        </p>
      </div>
    </div>
  );
}

export default LandCard