import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { thunkCurrentUserPets } from "../../store/profile";

const SearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const allPetProfilesObj=useSelector(state=>state.profile)
  const allPetProfilesArray=Object.values(allPetProfilesObj)

  useEffect(()=> {
    dispatch (thunkCurrentUserPets())
  },[dispatch])

  const handleChange = e =>{
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const enterPress=e=>{
    if(e.key==="Enter"){
        history.push(`/results?query=${searchInput}`)
    }
  }
  return(
<div className="landing-page">
    <div className="search-container">
        <div className="searchbar">
        <input type="search"
        placeholder="Search for pet profiles"
        onChange={handleChange}
        value={searchInput}
        onKeyDown={enterPress}
        ></input>
        </div>
    </div>

</div>
  )
};
export default SearchBar