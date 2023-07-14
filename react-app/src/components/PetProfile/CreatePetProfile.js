import PetProfileForm from "./PetProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrentUserPets } from "../../store/profile";

const CreateProfile=()=> {
    const dispatch=useDispatch()
    const sessionUserId=useSelector(state=>state.session.user?.id)
    const userId = sessionUserId || null

    useEffect(()=>{
        dispatch(thunkCurrentUserPets())
    },[dispatch])

    const profile = {
        dog_name:"",
        breed:"",
        weight:"",
        age:"",
        gender:"",
        image:null,
        userId:userId
    }
    if (userId===null) {
       return  "Please log in to create a new pet profile"
    }
    return (
        <>
        <PetProfileForm
        formType="Create Profile"
        profile={profile}
        >

        </PetProfileForm>
        </>
    )
}
export default CreateProfile