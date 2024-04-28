import { useState, useEffect, useCallback, useRef } from "react";
import LandCard from "./LandCard";
import "./Landlistings.css";
import { ClipLoader } from "react-spinners";

function LandListings() {
  const [lands, setLands] = useState([]);
  const [offset, setOffset] = useState(1);
  const [maxResults, setMaxResults] = useState(0);
  const limit = 10;
  const isLoading = useRef(false);
  const fetchLands = useCallback(async () => {
    const response = await fetch(
      `https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${offset}&page_size=${limit}`
    );
    const data = await response.json();
    setLands((prevLands) => [...prevLands, ...data.results]);
    setMaxResults(data.count);
  }, [offset, limit]);

  useEffect(() => {
    fetchLands();
  }, [offset, fetchLands]);

  const handleLoadMore = async () => {
    setOffset((prevOffset) => prevOffset + limit);
    await fetchLands();
    isLoading.current = false
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading.current) {
        isLoading.current = true
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <h1>Available Lands</h1>
      <div className="lands-wrapper">
        <div className="land-grid">
          {lands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      </div>
      {lands.length < maxResults && isLoading.current && (
        <div className="loader-container">
          <ClipLoader color="#ffde59" size={100} />
        </div>
      )}
    </div>
  );
}

export default LandListings;
