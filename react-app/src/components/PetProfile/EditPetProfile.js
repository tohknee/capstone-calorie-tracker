import PetProfileForm from "./PetProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useEffect} from "react";
import { thunkGetOnePetProfile} from "../../store/profile";

const EditPetProfile = () => {
    const dispatch=useDispatch()
    const {profileId} =useParams()
    const singeProfile= useSelector(state=>state.profile[profileId])

    console.log("In edittt")

    useEffect(()=>{
        dispatch(thunkGetOnePetProfile(profileId))
    },[dispatch,profileId])

    if(!singeProfile) return "Profile not found."
    
    return (
        <>
        <h1>EDIT FORM</h1>
        <PetProfileForm
        profile={singeProfile}
        formType="Edit Profile"
        ></PetProfileForm>
        </>
    )
}

export default EditPetProfile