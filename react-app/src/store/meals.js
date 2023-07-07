const GET_ALL_MEALS='meals/all'
const GET_ONE_MEAL="meals/one"
const CREATE_MEAL_LOG="meals/new"
const EDIT_MEAL_LOG="meals/edit"
const DELETE_MEAL_LOG="meals/delete"

const loadCurrentUserMealLogs=(meals)=>({
    type:GET_ALL_MEALS,
    meals
})

const getOneMealLog=(meal)=>({
    type:GET_ONE_MEAL,
    meal
})

const createMealLog=(meal)=>({
    type:CREATE_MEAL_LOG,
    meal
})

const editMealLog=(meal)=>({
    type:EDIT_MEAL_LOG,
    meal
})

const deleteMealLog=(meal)=>({
    type:DELETE_MEAL_LOG,
    meal
})

export const thunkCurrentUserMealLogs=()=>async(dispatch)=>{
    const response = await fetch('/api/meals/all')
    if(response.ok){
        const data=await response.json()
        dispatch(loadCurrentUserMealLogs(data))
    }
    else {
        console.log("Current user meal thunk error")
    }
}

export const thunkGetOneMealLog=(mealId)=> async (dispatch)=>{
    const response= await fetch(`/api/meals/details/${mealId}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getOneMealLog({ ...data, id: mealId }));
    }
}

export const thunkCreateMealLog=(meal,dogId)=>async(dispatch)=>{

    const response = await fetch(`/api/meals/dogs/${dogId}/new`,{
        "method": "POST",
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify(
            meal
        )
    })
    if (response.ok) {
        const data = await response.json()
            dispatch(createMealLog(data))
    }
}
export const thunkEditMealLog=(meal)=>async dispatch => {
    const response=await fetch(`/api/meals/edit/${meal.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meal)
    })
    if (response.ok){
        const data=await response.json()
        dispatch(editMealLog(data))
    }
}

export const thunkDeleteMealLog=(mealId)=> async (dispatch) =>{
    const response=await fetch (`/api/meals/delete/${mealId}`,{
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteMealLog(mealId))
    }
}
const initialState={}
const mealReducer = (state=initialState, action)=> {
    switch(action.type) {
        case GET_ALL_MEALS:{
            const newState={}
            const allMealLogs=action.meals

            allMealLogs.forEach(meal=>{
                newState[meal.id]=meal
            })
            return {
                ...newState
            }
        }
        case GET_ONE_MEAL:{
            const newState={}
            const newMealLog=action.meal
            newState[newMealLog.id]=newMealLog
            return{
                ...state,
                ...newState
            }
        }

    case CREATE_MEAL_LOG:{
        const newState={}
        const newMealLog=action.meal
        newState[newMealLog.id]=newMealLog
        return {
                ...state, //spread old stuff
                ...newState //plus the new one
        }
    }
    
        case EDIT_MEAL_LOG: {
            const editedMealLog = action.meal;
            return {
              ...state,
              [editedMealLog.id]: editedMealLog,
            };
          }
          
        case DELETE_MEAL_LOG:{
            const mealId=action.meal
            const newState= {
                ...state
            }
            delete newState[mealId]
            return newState
        }
        default:return state
    }
}

export default mealReducer