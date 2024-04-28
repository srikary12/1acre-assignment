import { useState, useEffect } from "react";

function LandListings(){
    const [landData, setlandData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('https://prod-be.1acre.in/lands/?ordering=-updated_at&page=1&page_size=10');
            const data = await response.json();
            setlandData(data.results);
        };
        fetchData();
    }, [page]);

    
}