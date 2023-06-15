import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserPets } from "../../store/profile";


const GetCurrentPetProfiles = () => {
    const dispatch = useDispatch()
    const profiles=useSelector(state=>state.profile)

    const profilesArray = Object.values(profiles)

    useEffect(()=>{
        dispatch(thunkCurrentUserPets())
    },[dispatch])


if(!profiles){
    return "loading..."
}

console.log("this is working",profilesArray)
return (
<>
<h1>Your Pets</h1>
<div>
  {profilesArray.map((profile) => {
    return (
      <div key={profile.id}>
        <div>Pet Name: {profile.dog_name} Breed: {profile.breed}</div>
        <div>Age:{profile.age} Weight: {profile.weight}</div>
        
        <br></br>
      </div>
    );
  })}
</div>
</>
);
};
export default GetCurrentPetProfiles