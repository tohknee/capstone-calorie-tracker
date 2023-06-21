import PetProfileForm from "./PetProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useEffect} from "react";
import { thunkGetOnePetProfile} from "../../store/profile";

const EditPetProfile = () => {
    const dispatch=useDispatch()
    const {profileId} =useParams()
    const singleProfile= useSelector(state=>state.profile[profileId])
    const singleProfile2= useSelector(state=>state.profile)
    const loggedIn=useSelector((state)=>state.session)


    useEffect(()=>{
        dispatch(thunkGetOnePetProfile(profileId))
    },[dispatch,profileId])


    if(loggedIn.user===null) return "Please Log in to edit profile."
    if (singleProfile?.user_id !== profileId) {
        return "You are not authorized to edit this profile."; // Display an error message if the user doesn't own the profile
    }
    if(!singleProfile) return "Profile not found."

    return (
        <>
        <h1>EDIT FORM</h1>
        <PetProfileForm
        profile={singleProfile}
        formType="Edit Profile"
        currentPetId={profileId}
        ></PetProfileForm>
        </>
    )
}

export default EditPetProfile