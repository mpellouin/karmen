import { useCallback, useEffect, useState } from "react";
import './index.css';

const SearchBar = ({setSelected}) => {
    const [searchTerm, setSearchTerm] = useState(null);

    const verifSearch = (searchTerm) => {
        if (searchTerm <= 0 || searchTerm >= 152)
            return null;
        return searchTerm;
    }

    const submitSearch = useCallback((e) => {
        if (searchTerm <= 0 || searchTerm >= 152 || searchTerm === null)
            return;
        if (e.keyCode === 13)
            setSelected(searchTerm)    
    }, [searchTerm, setSelected]);

    useEffect(() => {
        document.addEventListener('keyup', submitSearch);
        return () => {
            document.removeEventListener('keyup', submitSearch);
        }
    }, [submitSearch])

    return (
    <div className="searchBarContainer">
        <input type="number" placeholder="Search for a pokemon by entering it's id!" className="searchBar" onChange={(e) => setSearchTerm(e.target.value)} min={1} max={151}/>
        <button className="searchButton" onClick={() => setSelected(verifSearch(searchTerm))}>
            <img src='searchIcon.svg' alt="Search Icon" className="searchIcon"/>
        </button>
    </div>
)};

export default SearchBar;