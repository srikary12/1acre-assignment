import { useState, useEffect } from "react";
import LandCard from "./LandCard";

function LandListings() {
    const [lands, setLands] = useState([]);
    const [offset, setOffset] = useState(1);
    const [maxResults, setMaxResults] = useState(0);
    const limit = 10;
  
    const fetchLands = async () => {
      const response = await fetch(`https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${offset}&page_size=${limit}`);
      const data = await response.json();
      setLands(prevLands => [...prevLands, ...data.results]);
      setMaxResults(data.count)
    };
  
    useEffect(() => {
      fetchLands();
    });
  
    const handleLoadMore = async () => {
      setOffset(prevOffset => prevOffset + limit);
      await fetchLands();
    };
  
    return (
      <div className="container">
        <h1>Available Lands</h1>
        <div className="lands-wrapper">
          {lands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
        {lands.length < maxResults && (
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    );
  }
  
  export default LandListings;