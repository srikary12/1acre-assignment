import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./LandCard.css";
function LandCard({ land }) {
  const {
    land_media,
    total_price,
    village_name,
    mandal_name,
    district_name,
    total_land_size_in_acres: { acres, guntas },
  } = land;
  const roundedPrice = parseFloat(total_price).toFixed(2);
  const imageStyle = {
    height: "220px",
    width: "100%",
    objectFit: "cover",
  };

  return (
    <div className="land-card">
      <Carousel>
        {land_media.map((image) => (
          <Carousel.Item key={image.id}>
            <img
              className="land-card-image"
              style={imageStyle}
              src={image.image}
              alt="Land"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="land-details">
        <h3>
          {village_name}, {mandal_name}, <br></br>{district_name}[dt]
        </h3>
        {(acres > 0 || guntas > 0) && (
          <>
            {acres > 0 && guntas === 0 && (
              <p>
                <b>{acres} Acres</b> ₹ {roundedPrice} Crore
              </p>
            )}
            {acres > 0 && guntas !== 0 && (
              <p>
                <b>
                  {acres} Acres {guntas} Guntas
                </b>{" "}
                ₹ {total_price} Crore
              </p>
            )}
            {acres === 0 && guntas > 0 && (
              <p>
                <b>{guntas} Guntas</b> ₹ {roundedPrice} Crore
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LandCard;
