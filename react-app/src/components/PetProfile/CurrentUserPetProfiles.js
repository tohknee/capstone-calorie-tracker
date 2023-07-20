import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserPets } from "../../store/profile";
import OpenModalButton from "../OpenModalButton";
import DeletePetProfile from "./DeleteProfile";
import { Link,useHistory } from "react-router-dom"
import "./PetProfile.css"

const GetCurrentPetProfiles = () => {
    const dispatch = useDispatch()
    const profiles=useSelector(state=>state.profile)
    const loggedIn=useSelector((state)=>state.session)
    const history=useHistory()
    const profilesArray = Object.values(profiles)

    useEffect(()=>{
        dispatch(thunkCurrentUserPets())
    },[dispatch])

    if(loggedIn.user===null) return "Please Log in to view profile."

if(!profiles){
    return "loading..."
}

const handleButtonClick=()=>{
  history.push('/profile/new')
}
if(Object.keys(profiles).length===0){
  return <div className="no-meal-form">It appears that you haven't made any pet profiles yet. <button type="submit" onClick={handleButtonClick}>Click here </button> to create a new pet profile! </div>
}
return (
    <>
    
    <h1>Your Pets</h1>
    <div className="pet-profiles">
   
      {profilesArray.map((profile) => (
        
        <div className="profile-card" key={profile.id}>
          {/* <Link to={`profile/${profile.id}`} className="link"> */}
          <div className="profile-info">
            <div>
            Pet Name: {profile.dog_name}
                </div>
                <div>
             Breed: {profile.breed}
                    </div>
    
            <div>
              Age: {profile.age} years
            </div>
            <div>
             Weight: {profile.weight} lbs
            </div>
          </div>
          
          <img className="profile-image" src={profile.image}></img>
          <div className="profile-actions">
            <div className="action-div">
            <Link to={`/profile/edit/${profile.id}`}>
              <button className="action-button">Edit Pet</button>
            </Link>
            </div>
            <div className="action-div">
            <Link to={`/profile/${profile.id}/meals/new`}>
              <button className="action-button">Add meal log</button>
            </Link>
            </div>
            {/* <div className="action-div"> */}
            {/* <Link to={`/profile/edit/${profile.id}`}> */}
            {/* <Link to={'/coming-soon'}>
              <button className="action-button">Add calorie goal</button>
              </Link>
            </div> */}
            {/* <div className="action-div"> */}
            {/* <Link to={`/profile/edit/${profile.id}`}> */}
            {/* <Link to={'/coming-soon'}>
              <button className="action-button">Add weight goal</button>
              </Link>
            </div> */}
            <div className="action-div">
                {/* <button className="action-button modal-button"> */}
            <OpenModalButton 
              buttonText="Remove Pet"
              modalComponent={<DeletePetProfile profileId={profile.id} />}
              />
              {/* </button> */}
            </div>
          </div>
              {/* </Link> */}
        </div>
      ))}
    </div>
  </>
);
};
export default GetCurrentPetProfiles