const GET_CURRENT_CALORIE_GOALS="calories/all"
const Get_ONE_CALORIE_GOAL="calories/one"



const loadCurrentPetCalorieGoal = (goal)=>({
    type:GET_CURRENT_CALORIE_GOALS,
    goal
})

const getOneCalorieGoal = (goal)=>({
    type:Get_ONE_CALORIE_GOAL,
    goal
})

export const thunkCurrentPetCalorieGoal=()=>async(dispatch)=>{
    const response = await fetch('/api/calories/all')
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrentPetCalorieGoal(data))
    }
}

// export const thunkGetOneCalorieGoal=()=>async(dispatch)=>{
//     const response= await fetch()
// }
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