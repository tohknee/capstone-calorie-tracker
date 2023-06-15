import PetProfileForm from "./PetProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrentUserPets } from "../../store/profile";

const CreateProfile=()=> {
    const dispatch=useDispatch()
    const profilesObj=useSelector(state=>state)
    const sessionUserId=useSelector(state=>state.session.user.id)
    const userId = sessionUserId

    useEffect(()=>{
        dispatch(thunkCurrentUserPets())
    },[dispatch])

    const profile = {
        dog_name:"",
        breed:"",
        weight:"",
        age:"",
        gender:"",
        userId:userId
    }

    
    return (
        <>
        {console.log("Create profile js ",sessionUserId)}
        {console.log("Create profile js ",profilesObj)}
      
        <PetProfileForm
        formType="Create Profile"
        profile={profile}
        >

        </PetProfileForm>
        </>
    )
}
export default CreateProfile