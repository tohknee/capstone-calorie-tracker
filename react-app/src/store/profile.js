const GET_CURRENT_PETS="profile/pets"



const loadCurrentUserPetProfiles = (profiles) =>({
    type:GET_CURRENT_PETS,
    profiles
})

export const thunkCurrentUserPets=()=>async(dispatch)=>{
    const response = await fetch('/api/profile/')
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrentUserPetProfiles(data))
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
        default:return state
    }
}

export default profileReducer