const GET_CURRENT_PETS="profile/pets"
const CREATE_PET_PROFILE="profile/new"
const GET_ONE_PET_PROFILE="profile/one"
const EDIT_PET_PROFILE="profile/edit"
const DELETE_PET_PROFILE="profile/delete"




const loadCurrentUserPetProfiles = (profiles) =>({
    type:GET_CURRENT_PETS,
    profiles
})

const createProfile = (profile)=>({
    type: CREATE_PET_PROFILE,
    profile
})

const getOnePetProfile=(profile)=>({
    type:GET_ONE_PET_PROFILE,
    profile
})

const editProfile=(profile)=>({
    type:EDIT_PET_PROFILE,
    profile
})

const deleteProfile=(profile)=>({
    type:DELETE_PET_PROFILE,
    profile
})

export const thunkCurrentUserPets=()=>async(dispatch)=>{
    const response = await fetch('/api/profile/')
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrentUserPetProfiles(data))
    }
}

export const thunkCreatePetProfile=(profile)=>async(dispatch)=>{
    const response = await fetch('/api/profile/new',{
        "method": "POST",
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify(
            profile
        )
    })
    if (response.ok){
        const data = await response.json()
            dispatch(createProfile(data))
        
    }
}

export const thunkGetOnePetProfile=(profileId)=>async(dispatch)=>{
    const response = await fetch(`/api/profile/${profileId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getOnePetProfile(data))
    }
}

export const thunkEditProfile=(profile)=> async dispatch=>{
    const response= await fetch(`/api/profile/edit/${profile.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editProfile(data))
    }
}

export const thunkDeleteProfile =(profileId) => async dispatch=>{
    const response =await fetch (`/api/profile/delte/${profileId}`,{
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteProfile(profileId))
    }
}

const initialState = {}
const profileReducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_CURRENT_PETS:{

            const newState={}
            const allProfiles=action.profiles

            allProfiles.forEach(profile=>{
                newState[profile.id]=profile
            })
            return {
                ...state,
                ...newState
            }
        }
        case CREATE_PET_PROFILE:{

            const newState={}
            const newProfile=action.profile
            newState[newProfile.id]=newProfile
            return {
                ...state,
                ...newState
            }
        }
        case GET_ONE_PET_PROFILE:{
            const newState={}
            const newProfile= action.profile
            newState[newProfile.id]=newProfile
            return{
                ...state,
                ...newState
            }
        }
        case EDIT_PET_PROFILE:{
            const newState={}
            const newProfile= action.profile
            newState[newProfile.id]=newProfile
            return{
                ...state,
                ...newState
            }
        }
        case DELETE_PET_PROFILE:{
            const profileId=action.profile
            const newState = {
                ...state
            }
            delete newState[profileId]
            return newState
        }
        default:return state
    }
}

export default profileReducer