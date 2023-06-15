import PetProfileForm from "./PetProfileForm";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { thunkCurrentUserPets } from "../../store/profile";

const CreateProfile=()=> {
    const dispatch=useDispatch()
    const profilesObj=useSelector(state=>state)
    const sessionUserId=useSelector(state=>state.session.user.id)
    const profile = {}

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