import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
    //hooks
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();
    const [focusOnSearch, setFocusOnSearch] = useState(false);

    //functions
    const checkForEnter = (e) => { //allows Enter key to work for searchbar
      if (e.key === 'Enter') {
        searchForTerm();
      }
    }

    const searchForTerm = async () => { //runs search
      history.push(`/search/${searchTerm}`);
    }

    const updateSearchTerm = (e) => { //updates search term while typing (to be used with dynamic search)
      setSearchTerm(e.target.value);
    }

    //JSX
      return (
        <div className={focusOnSearch ? 'nav__search nav__search--border_on_focus' : 'nav__search'}>
          <i className="fas fa-search"></i>
          <input
          className='nav__search--box'
          placeholder="Search events"
          onBlur={()=>setFocusOnSearch(false)}
          onFocus={()=>setFocusOnSearch(true)}
          value={searchTerm}
          onChange={updateSearchTerm}
          onKeyUp={checkForEnter}
          type="search">
          </input>
        </div>
      )
  }

  export default SearchBar;