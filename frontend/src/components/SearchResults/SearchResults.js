//external imports
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//internal imports
import EventCardDisplay from '../EventCardDisplay';
import './SearchResults.css';

const SearchResults = () => {
    // const dispatch = useDispatch();
    const { searchTerm } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    // const reviewsObj = useSelector(state => state.reviews);
    // const reviews = Object.values(reviewsObj);

    useEffect(() => {
        (async() => {
            const res = await fetch(`/api/search/${searchTerm}`);

            if (res.ok) {
                const data = await res.json();
                // console.log('++++++++', data);
                setSearchResults(data);
            }
        })();
    }, [searchTerm]);

    // useEffect(()=>{
    //     dispatch(getReviews());
    // }, [dispatch]);

    return (
        <>
            <h1 className='search_term'> Search Term: {searchTerm} </h1>
            <ul>
                {
                    searchResults.length ?
                    <EventCardDisplay arrInput={searchResults}/>
                    :
                    <div className='search_none'>Sorry, no results found.</div>
                }
            </ul>

        </>
    )
}

export default SearchResults;

/*
                    searchResults.map( result => {
                        return (
                            <div key={result.id}>
                                <li>Title: {result.title}</li>
                            </div>
                        );
                    })
*/