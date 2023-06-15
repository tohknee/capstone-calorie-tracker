const GET_CURRENT_PETS="profile/pets"
const CREATE_PET_PROFILE="profile/new"




const loadCurrentUserPetProfiles = (profiles) =>({
    type:GET_CURRENT_PETS,
    profiles
})

const createProfile = (profile)=>({
    type: CREATE_PET_PROFILE,
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
        default:return state
    }
}

export default profileReducer