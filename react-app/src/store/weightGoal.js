const GET_WEIGHT_GOALS="weights/all"
const GET_ONE_WEIGHT_GOAL="weights/one"
const CREATE_WEIGHT_GOAL="weights/new"


const loadCurrentUserPetsWeightGoals = (goals)=>({
    type:GET_WEIGHT_GOALS,
    goals
})

const createWeightGoal =(goal)=>({
    type:CREATE_WEIGHT_GOAL,
    goal
})

export const thunkCurrentUsersPetsWeightGoals=()=>async(dispatch)=>{
    const response = await fetch('/api/weight/all')
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrentUserPetsWeightGoals(data))
    }
}

export const thunkCreateWeightGoal=()=>async(dispatch)=>{
    const response=await fetch('/api/weight/new')
}

const initialState={}
const weightReducer = (state = initialState, action)=> {
    switch(action.type){
        case GET_WEIGHT_GOALS: {
            const newState = {}
            const allGoals = action.goal

            allGoals.forEach(goal=>{
                newState[goal.id]=goal
            })
            return {
                ...state,
                ...newState
            }
        }
        default:
            return state;
    }
}

export default weightReducer


