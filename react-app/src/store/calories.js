const GET_CURRENT_CALORIE_GOALS="calories/all"

const loadCurrentPetCalorieGoal = (goal)=>({
    type:GET_CURRENT_CALORIE_GOALS,
    goal
})

export const thunkCurrentPetCalorieGoal=()=>async(dispatch)=>{
    const response = await fetch('/api/calories/all')
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrentPetCalorieGoal(data))
    }
}

const initialState={}
const calorieReducer = (state = initialState, action)=> {
    switch(action.type){
        case GET_CURRENT_CALORIE_GOALS: {
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

export default calorieReducer