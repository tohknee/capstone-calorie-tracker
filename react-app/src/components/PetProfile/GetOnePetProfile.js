import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { useParams } from 'react-router-dom';
import { thunkGetOnePetProfile } from "../../store/profile";
// import { thunkCurrentPetCalorieGoal } from "../../store/calories";

const GetOnePetProfile = () => {
    const dispatch=useDispatch()
    const {profileId}=useParams()
    const profile=useSelector(state=>state.profile[profileId])
    // const calorieGoal=useSelector(state=>state.calories)
    console.log("THIS IS GET ONE PROFILE", profile)
    // console.log("THIS IS GET calorie goa", calorieGoal)
    
    useEffect(()=>{
        dispatch(thunkGetOnePetProfile(profileId))
        // dispatch(thunkCurrentPetCalorieGoal())
    },[dispatch,profileId])


    if(!profile) return "Profile does not exist"
    return (
        <div>
            {console.log(profile)}
            <div>GET ONE PRFILE</div>
            <div>pet name {profile.dog_name} breed {profile.breed}</div>
        </div>
    )
}

export default GetOnePetProfile