import React, { useRef, useState } from 'react'
import './SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
    onChange?: (searchTerm: string) => void;
    onSearch?: (searchTerm: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const searchBarRef = useRef<HTMLInputElement>(null);

    return (
        <div className="searchBar-background">
            <input 
                ref={searchBarRef}
                className="searchBar-input title3" 
                type="text" 
                placeholder="Buscar"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                    props.onChange && props.onChange(event.target.value);
                }}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        if (searchBarRef.current) {
                            searchBarRef.current.blur();
                        }
                        props.onSearch && props.onSearch(searchTerm);
                    }
                }}
                />
            <div 
                className="button-search"
                onClick={() => {
                    if (searchBarRef.current) {
                        searchBarRef.current.blur();
                    }
                    props.onSearch && props.onSearch(searchTerm);
                }}>
                <FontAwesomeIcon color="white" icon={faSearch} />
            </div>
        </div>
    )
}
