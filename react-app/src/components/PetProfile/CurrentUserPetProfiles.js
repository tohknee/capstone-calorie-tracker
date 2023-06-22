import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserPets } from "../../store/profile";
import OpenModalButton from "../OpenModalButton";
import DeletePetProfile from "./DeleteProfile";
import { Link } from "react-router-dom"
import "./PetProfile.css"

const GetCurrentPetProfiles = () => {
    const dispatch = useDispatch()
    const profiles=useSelector(state=>state.profile)
    const loggedIn=useSelector((state)=>state.session)

    const profilesArray = Object.values(profiles)

    useEffect(()=>{
        dispatch(thunkCurrentUserPets())
    },[dispatch])

    if(loggedIn.user===null) return "Please Log in to view profile."

if(!profiles){
    return "loading..."
}

return (
    <>
    <h1>Your Pets</h1>
    <div className="pet-profiles">
      {profilesArray.map((profile) => (
        <div className="profile-card" key={profile.id}>
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
          <img className="profile-image" src="https://d3ciu7npf6axud.cloudfront.net/5c93a055-1695-47c6-84f8-ae2b5e1b58db/images/defaults/dog-image.webp"></img>
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
        </div>
      ))}
    </div>
  </>
);
};
export default GetCurrentPetProfiles