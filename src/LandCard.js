import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./LandCard.css";
import { useState, useEffect } from "react";

function LandCard({ land }) {
  const {
    land_media,
    total_price,
    price_per_acre_crore,
    village_name,
    mandal_name,
    district_name,
    total_land_size_in_acres: { acres, guntas },
  } = land;
  const [displayLakh, setDisplayLakh] = useState(false)
  const roundedPrice = parseFloat(total_price).toFixed(2);
  const priceperacreinLakh = price_per_acre_crore.lakh;
  const priceperacreincrore = price_per_acre_crore.crore;
  const roundedPrice_per_acre =  parseFloat(priceperacreinLakh) + parseFloat(priceperacreincrore);

  useEffect(() => {
    // Set displayLakh based on pricePerAcreInCrore value
    if (priceperacreincrore <= 0) {
      setDisplayLakh(true);
    } else {
      setDisplayLakh(false);
    }
  }, [priceperacreincrore]);
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
                <b>{acres} Acres • </b> ₹ {roundedPrice_per_acre} {displayLakh ? "Lakhs" : "Crores"} per Acre
              </p>
            )}
            {acres > 0 && guntas !== 0 && (
              <p>
                <b> {acres} Acres {guntas} Guntas • </b> ₹ {roundedPrice_per_acre} {displayLakh ? "Lakhs" : "Crores"} per Acre
              </p>
            )}
            {acres === 0 && guntas > 0 && (
              <p>
                <b>{guntas} Guntas • </b> ₹ {roundedPrice} {displayLakh ? "Lakhs" : "Crores"} per Acre
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LandCard;
